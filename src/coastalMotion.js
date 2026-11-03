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

export function getCoastalBreeze(seconds) {
  const time = Math.max(0, seconds)
  const arrival = Math.min(1, time / 1.8)
  const strength = arrival * arrival * (3 - 2 * arrival)
  return {
    top: strength * (.018 * Math.sin(time * .55) + .004 * Math.sin(time * .91 + .8)),
    right: strength * (.026 * Math.sin(time * .46 + .9) + .006 * Math.sin(time * .79 + .2)),
    left: strength * (.017 * Math.sin(time * .5 + 1.9) + .004 * Math.sin(time * .82)),
    strength,
  }
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
uniform vec2 u_image_size;
uniform vec3 u_breeze;
uniform float u_time;
uniform float u_strength;
varying vec2 v_uv;

vec2 turnAround(vec2 uv, vec2 pivot, float angle) {
  vec2 point = (uv - pivot) * u_image_size;
  float c = cos(angle);
  float s = sin(angle);
  return pivot + vec2(c * point.x - s * point.y, s * point.x + c * point.y) / u_image_size;
}

void main() {
  vec2 uv = v_uv;
  vec4 original = texture2D(u_image, uv);

  // Broad, feathered areas flex each botanical corner around its rooted edge.
  float top = (1.0 - smoothstep(0.50, 0.64, uv.x)) * (1.0 - smoothstep(0.28, 0.35, uv.y));
  float right = smoothstep(0.61, 0.79, uv.x) * smoothstep(0.805, 0.89, uv.y);
  float left = (1.0 - smoothstep(0.17, 0.25, uv.x)) * smoothstep(0.92, 0.975, uv.y);
  float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float pin = smoothstep(0.0, 0.012, edge);
  vec2 displaced = uv;
  displaced += (turnAround(uv, vec2(0.015, 0.015), u_breeze.x) - uv) * top * pin;
  displaced += (turnAround(uv, vec2(0.995, 0.99), u_breeze.y) - uv) * right * pin;
  displaced += (turnAround(uv, vec2(0.005, 0.995), u_breeze.z) - uv) * left * pin;

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
    float drift = sin(uv.y * 190.0 - u_time * 0.9)
      + 0.3 * sin(uv.x * 84.0 + uv.y * 120.0 - u_time * 0.6);
    float swell = sin(uv.y * 135.0 + uv.x * 22.0 - u_time * 0.72);
    displaced += vec2(drift * 0.0035, swell * 0.0013) * water * depth * u_strength;
  }

  vec4 color = texture2D(u_image, clamp(displaced, vec2(0.0), vec2(1.0)));
  float shimmer = sin(uv.y * 320.0 - u_time * 0.8 + sin(uv.x * 26.0));
  color.rgb *= 1.0 + shimmer * water * 0.025 * u_strength;
  gl_FragColor = color;
}`

export function createCoastalRenderer(canvas, image, container) {
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
    gl.uniform2f(gl.getUniformLocation(program, 'u_image_size'), image.naturalWidth, image.naturalHeight)
    const breezeLocation = gl.getUniformLocation(program, 'u_breeze')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const strengthLocation = gl.getUniformLocation(program, 'u_strength')

    const draw = seconds => {
      const breeze = getCoastalBreeze(seconds)
      gl.uniform3f(breezeLocation, breeze.top, breeze.right, breeze.left)
      gl.uniform1f(timeLocation, seconds)
      gl.uniform1f(strengthLocation, breeze.strength)
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
