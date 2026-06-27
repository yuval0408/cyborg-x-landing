import { useEffect, useRef } from 'react';

export default function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    } catch (e) {
      console.error('WebGL not supported:', e);
    }
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
          vec2 uv = v_texCoord;
          vec2 p = (uv - 0.5) * 2.0;
          p.x *= u_resolution.x / u_resolution.y;

          // Animated grid lines
          float gridScale = 15.0;
          vec2 gridUv = fract(uv * gridScale + vec2(0.0, u_time * 0.04));
          float gridLine = smoothstep(0.02, 0.0, abs(gridUv.x - 0.5)) + smoothstep(0.02, 0.0, abs(gridUv.y - 0.5));
          gridLine *= 0.12;

          // Scan lines
          float scanline = sin(uv.y * 500.0 + u_time * 6.0) * 0.025;

          // Radial glow
          float dist = length(p);
          float glow = 0.06 / (dist + 0.4);
          
          // Soft interactive mouse glow
          vec2 normMouse = u_mouse / u_resolution;
          vec2 mouseDiff = (uv - normMouse) * 2.0;
          mouseDiff.x *= u_resolution.x / u_resolution.y;
          float mDist = length(mouseDiff);
          float mouseGlow = 0.04 / (mDist + 0.15);

          // Floating particles
          float particles = sin(uv.x * 40.0 + u_time) * cos(uv.y * 40.0 - u_time) * 0.5 + 0.5;
          particles = pow(particles, 16.0) * 0.15;

          // Neon colors from design system
          vec3 bg = vec3(0.02, 0.03, 0.086); // #050816
          vec3 cyan = vec3(0.0, 0.96, 1.0);   // #00F5FF
          vec3 purple = vec3(0.54, 0.36, 0.96); // #8B5CF6
          
          vec3 color = bg;
          color += cyan * gridLine;
          color += purple * glow;
          color += cyan * mouseGlow * 0.4;
          color += cyan * particles;
          color += vec3(0.0, 0.5, 1.0) * scanline;

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vsShader = compileShader(vs, gl.VERTEX_SHADER);
    const fsShader = compileShader(fs, gl.FRAGMENT_SHADER);
    if (!vsShader || !fsShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vsShader);
    gl.attachShader(program, fsShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttrLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttrLocation);
    gl.vertexAttribPointer(posAttrLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const render = (t: number) => {
      if (!canvas || !gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    const syncSize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vsShader);
        gl.deleteShader(fsShader);
      }
    };
  }, []);

  return (
    <canvas
      id="shader-canvas-ANIMATION_2"
      ref={canvasRef}
      className="block w-full h-full object-cover"
    />
  );
}
