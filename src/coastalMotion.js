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
  { name: 'top', x: -28, y: 30, width: 610, height: 610, origin: '0% 32.5%', positive: 3.2, negative: -2.8, seconds: 8.5, delay: 0 },
  { name: 'right', x: 493, y: 1260, width: 400, height: 420, origin: '87.5% 100%', positive: 3.8, negative: -3.1, seconds: 9.3, delay: .4 },
]

// Layout size stays stable while the envelope translates its invitation card.
export function getCoastalElementSize(element, environment = window) {
  const style = environment.getComputedStyle(element)
  return { width: parseFloat(style.width) || element.clientWidth, height: parseFloat(style.height) || element.clientHeight }
}

export const COASTAL_CLOUDS = [
  { shape: 'wisp', left: 55, top: -1, width: 40, seconds: 22, delay: -6, travel: 16, opacity: .94 },
  { shape: 'rounded', left: 73, top: 5.5, width: 25, seconds: 34, delay: -12, travel: 13, opacity: .90 },
  { shape: 'filament', left: 60, top: 12, width: 35, seconds: 38, delay: -17, travel: 14, opacity: .91 },
  { shape: 'wisp', left: 78, top: 20, width: 26, seconds: 34, delay: -10, travel: 12, opacity: .92 },
  { shape: 'filament', left: 81, top: 27, width: 22, seconds: 42, delay: -20, travel: 10, opacity: .86, mirror: true },
  { shape: 'filament', left: 61, top: 70, width: 33, seconds: 32, delay: -8, travel: 10, opacity: .87, mirror: true },
  { shape: 'rounded', left: 76, top: 73, width: 23, seconds: 35, delay: -22, travel: 10, opacity: .90 },
  { shape: 'wisp', left: 83, top: 76, width: 20, seconds: 37, delay: -15, travel: 8, opacity: .83 },
]

export const COASTAL_PETALS = [
  // Alternate a pair and a trio on a shared cycle, without accumulating a shower.
  // Visible flights last about 25 seconds, with separate origins and wind paths.
  { shape: 'slender', left: 20, top: 11.8, width: 9.2, seconds: 52, delay: 1, drift: 70, fall: 142, gust: 10, lift: -3, easing: 'cubic-bezier(.32,.12,.68,.9)', flutter: 4.8, angle: -15, rock: 24, turn: 18, pinch: .78, mirror: 1 },
  { shape: 'rounded', left: 10, top: 21, width: 10.5, seconds: 52, delay: 3, drift: 83, fall: 132, gust: -12, lift: 6, easing: 'cubic-bezier(.18,.18,.78,1)', flutter: 6.2, angle: 65, rock: 44, turn: 32, pinch: .62, mirror: -1 },
  { shape: 'curled', left: 21, top: 12.3, width: 9.6, seconds: 52, delay: 25, drift: 64, fall: 150, gust: 16, lift: -7, easing: 'cubic-bezier(.4,.08,.72,.94)', flutter: 5.1, angle: -55, rock: 38, turn: 100, pinch: .55, mirror: 1 },
  { shape: 'slender', left: 9, top: 20.5, width: 8.8, seconds: 52, delay: 27, drift: 88, fall: 127, gust: -6, lift: 3, easing: 'cubic-bezier(.22,.1,.72,.98)', flutter: 5.8, angle: 40, rock: 34, turn: 26, pinch: .7, mirror: -1 },
  { shape: 'rounded', left: 24, top: 12, width: 10, seconds: 52, delay: 29, drift: 60, fall: 148, gust: 7, lift: -9, easing: 'cubic-bezier(.38,.05,.64,.88)', flutter: 7.2, angle: -35, rock: 30, turn: 48, pinch: .66, mirror: 1 },
]

export const COASTAL_BIRDS = [
  { left: 64, top: 70.5, width: 5.5, seconds: 24, delay: -5, wing: 3.8 },
  { left: 69, top: 69, width: 4.8, seconds: 29, delay: -9, wing: 4.3 },
  { left: 73, top: 71.5, width: 4.2, seconds: 33, delay: -2, wing: 4.7 },
]

export function getCoastalWaterStrength(seconds) {
  const time = Math.max(0, seconds)
  const arrival = Math.min(1, time / 1.8)
  return arrival * arrival * (3 - 2 * arrival)
}

export function getCoastalSeaOffset(seconds) {
  const time = Math.max(0, seconds)
  // One uniform horizontal translation: left, then right, with no vertical warp.
  return Math.sin(time * Math.PI * 2 / 10) * .016 * getCoastalWaterStrength(time)
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
uniform float u_sea_offset;
varying vec2 v_uv;

float waterThread(vec3 color) {
  // Accept blue thread and bright ivory wave crests, never olive foliage.
  float blue = smoothstep(0.012, 0.045, min(color.g, color.b) - color.r);
  float ivory = smoothstep(0.64, 0.80, min(color.r, min(color.g, color.b)));
  float green = smoothstep(0.0, 0.025, color.g - max(color.r, color.b));
  return max(blue, ivory) * (1.0 - green);
}

float waterCoverage(vec2 uv, vec3 color) {
  float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float pin = smoothstep(0.0, 0.012, edge);
  float shore = mix(0.79, 0.815, smoothstep(0.55, 1.0, uv.x));
  float sea = smoothstep(shore, shore + 0.018, uv.y)
    * (1.0 - smoothstep(0.925, 0.965, uv.y)) * smoothstep(0.51, 0.57, uv.x);
  if (sea <= 0.0) return 0.0;
  vec3 nearby = (color
    + texture2D(u_image, uv + vec2(0.009, 0.0)).rgb
    + texture2D(u_image, uv - vec2(0.009, 0.0)).rgb
    + texture2D(u_image, uv + vec2(0.0, 0.005)).rgb
    + texture2D(u_image, uv - vec2(0.0, 0.005)).rgb) / 5.0;
  return sea * smoothstep(0.015, 0.075, min(nearby.g, nearby.b) - nearby.r)
    * waterThread(color) * pin;
}

void main() {
  vec2 uv = v_uv;
  vec4 original = texture2D(u_image, uv);
  float water = waterCoverage(uv, original.rgb);
  if (water < 0.001) discard;

  vec2 displaced = clamp(uv + vec2(u_sea_offset, 0.0), vec2(0.0), vec2(1.0));
  vec4 color = texture2D(u_image, displaced);
  // Check BOTH ends of the shift: a water destination must never pull a tree
  // or foreground leaf into the ocean. Leave the original pixel visible there.
  water = min(water, waterCoverage(displaced, color.rgb));
  if (water < 0.001) discard;
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
    const offsetLocation = gl.getUniformLocation(program, 'u_sea_offset')

    const draw = seconds => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(offsetLocation, getCoastalSeaOffset(seconds))
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    const resize = () => {
      const { width, height } = getCoastalElementSize(container)
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
      // Thirty frames per second keeps the lateral sea movement smooth on phones.
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
