export function getCoastalImageLayout({ width, height, imageWidth, imageHeight, fit = 'contain', pixelRatio = 1 }) {
  if (![width, height, imageWidth, imageHeight, pixelRatio].every(value => Number.isFinite(value) && value > 0)) {
    throw new RangeError('The artwork and viewport must have positive, finite dimensions.')
  }
  const scale = (fit === 'cover' ? Math.max : Math.min)(width / imageWidth, height / imageHeight)
  const renderedWidth = imageWidth * scale
  const renderedHeight = imageHeight * scale
  // Keep the original thread detail without rendering beyond the source resolution.
  const density = Math.min(pixelRatio, 2, 1 / scale)
  return {
    width: renderedWidth,
    height: renderedHeight,
    left: (width - renderedWidth) / 2,
    top: (height - renderedHeight) / 2,
    pixelWidth: Math.max(1, Math.round(renderedWidth * density)),
    pixelHeight: Math.max(1, Math.round(renderedHeight * density)),
  }
}

export const COASTAL_PLANT_REGIONS = [
  { name: 'top', clip: 'inset(0 34% 65% 0)', origin: '0% 7.5%', positive: 3.2, negative: -2.8, seconds: 8.5, delay: 0 },
  { name: 'right', clip: 'inset(76% 0 0 55%)', origin: '100% 100%', positive: 3.8, negative: -3.1, seconds: 9.3, delay: .4 },
]

export function getCoastalWaterStrength(seconds) {
  const time = Math.max(0, seconds)
  const arrival = Math.min(1, time / 1.8)
  return arrival * arrival * (3 - 2 * arrival)
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D u_image;
uniform float u_time;
uniform float u_strength;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  vec4 original = texture2D(u_image, uv);

  float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float pin = smoothstep(0.0, 0.012, edge);
  vec2 displaced = uv;

  // Follow the shoreline; nearby blue stitches include the ivory wave crests
  // while excluding the warm stone, green planting and distant mountains.
  float shore = mix(0.79, 0.815, smoothstep(0.55, 1.0, uv.x));
  float sea = smoothstep(shore, shore + 0.018, uv.y)
    * (1.0 - smoothstep(0.925, 0.965, uv.y)) * smoothstep(0.51, 0.57, uv.x);
  float water = 0.0;
  if (sea > 0.0) {
    vec3 nearby = (original.rgb
      + texture2D(u_image, uv + vec2(0.009, 0.0)).rgb
      + texture2D(u_image, uv - vec2(0.009, 0.0)).rgb
      + texture2D(u_image, uv + vec2(0.0, 0.005)).rgb
      + texture2D(u_image, uv - vec2(0.0, 0.005)).rgb) / 5.0;
    water = sea * smoothstep(0.015, 0.075, min(nearby.g, nearby.b) - nearby.r) * pin;
    float depth = mix(0.4, 1.0, smoothstep(shore, 0.94, uv.y));
    float drift = sin(uv.y * 190.0 - u_time * 1.25)
      + 0.3 * sin(uv.x * 84.0 + uv.y * 120.0 - u_time * 0.95);
    float swell = sin(uv.y * 135.0 + uv.x * 22.0 - u_time * 1.1);
    displaced += vec2(drift * 0.010, swell * 0.0038) * water * depth * u_strength;
  }

  // Overlay moving water on the original sea; all other artwork stays visible
  // directly from the unmodified illustration underneath.
  if (water < 0.001) discard;
  vec4 color = texture2D(u_image, clamp(displaced, vec2(0.0), vec2(1.0)));
  float shimmer = sin(uv.y * 320.0 - u_time * 1.15 + sin(uv.x * 26.0));
  color.rgb *= 1.0 + shimmer * water * 0.055 * u_strength;
  color.a *= water * 0.72;
  gl_FragColor = color;
}`

export function createCoastalWaterRenderer(canvas, image, container) {
  const gl = canvas.getContext('webgl', {
    alpha: true, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, powerPreference: 'low-power',
  })
  if (!gl) return null

  const shaders = []
  let program, buffer, texture
  let frame = 0
  let playing = false
  let elapsed = 0
  let startedAt = 0
  let lastFrame = -Infinity
  const disposeResources = () => {
    if (texture) gl.deleteTexture(texture)
    if (buffer) gl.deleteBuffer(buffer)
    if (program) gl.deleteProgram(program)
    shaders.forEach(shader => gl.deleteShader(shader))
  }

  try {
    const compile = (type, source) => {
      const shader = gl.createShader(type)
      shaders.push(shader)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Coastal motion shader could not compile.')
      return shader
    }
    program = gl.createProgram()
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Coastal motion shader could not link.')
    gl.useProgram(program)

    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0)
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const strengthLocation = gl.getUniformLocation(program, 'u_strength')

    const draw = seconds => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(timeLocation, seconds)
      gl.uniform1f(strengthLocation, getCoastalWaterStrength(seconds))
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      const layout = getCoastalImageLayout({
        width, height, imageWidth: image.naturalWidth, imageHeight: image.naturalHeight,
        fit: window.getComputedStyle(image).objectFit, pixelRatio: window.devicePixelRatio || 1,
      })
      Object.assign(canvas.style, {
        width: `${layout.width}px`, height: `${layout.height}px`,
        left: `${layout.left}px`, top: `${layout.top}px`,
      })
      canvas.width = layout.pixelWidth
      canvas.height = layout.pixelHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw(playing ? (elapsed + performance.now() - startedAt) / 1000 : elapsed / 1000)
    }
    const tick = now => {
      if (!playing) return
      // Thirty frames per second keeps the slow breeze smooth on phones.
      if (now - lastFrame >= 1000 / 30) {
        draw((elapsed + now - startedAt) / 1000)
        lastFrame = now
      }
      frame = window.requestAnimationFrame(tick)
    }
    const pause = () => {
      if (!playing) return
      elapsed += performance.now() - startedAt
      playing = false
      window.cancelAnimationFrame(frame)
      frame = 0
    }
    resize()
    return {
      resize,
      play() {
        if (playing) return
        startedAt = performance.now()
        lastFrame = -Infinity
        playing = true
        frame = window.requestAnimationFrame(tick)
      },
      pause,
      destroy() { pause(); disposeResources() },
    }
  } catch (error) {
    disposeResources()
    throw error
  }
}
