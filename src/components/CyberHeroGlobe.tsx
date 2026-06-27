import { useEffect, useRef } from 'react';

export default function CyberHeroGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth || 500;
    let height = canvas.height = canvas.clientHeight || 500;

    const nodes: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    // Create 3D spherical point distribution (Fibonacci sphere)
    const nodeCount = 120;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden ratio in radians

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y

      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // scale up to sphere radius
      const r = 140; 
      nodes.push({
        x: x * r,
        y: y * r,
        z: z * r,
        baseX: x * r,
        baseY: y * r,
        baseZ: z * r,
        radius: Math.random() * 2 + 1.5,
        color: Math.random() > 0.4 ? '#00f5ff' : '#8b5cf6',
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let angleY = 0.003;
    let angleX = 0.001;
    let mouseX = 0;
    let mouseY = 0;
    let targetAngleY = 0.003;
    let targetAngleX = 0.001;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = e.clientX - cx;
      mouseY = e.clientY - cy;

      // change rotation targets based on mouse position
      targetAngleY = mouseX * 0.00003;
      targetAngleX = mouseY * 0.00003;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth || 500;
      height = canvas.height = canvas.clientHeight || 500;
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.01;

      // Smooth rotation dampening
      angleY += (targetAngleY - angleY) * 0.08;
      angleX += (targetAngleX - angleX) * 0.08;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Rotate nodes and map to 2D
      const projectedNodes = nodes.map(node => {
        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Save rotated coordinates back
        node.x = x1;
        node.y = y2;
        node.z = z2;

        // Perspective projection
        const fov = 350;
        const scale = fov / (fov + z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        return {
          x: projX,
          y: projY,
          z: z2,
          scale,
          color: node.color,
          radius: node.radius * scale,
          pulse: Math.sin(time * 3 + node.pulsePhase) * 0.4 + 0.6,
        };
      });

      // Sort by Z index (depth buffering) so back nodes are drawn first
      projectedNodes.sort((a, b) => b.z - a.z);

      // Draw connections/neural pathways
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        if (n1.z > 80) continue; // Skip connections for distant back nodes

        let connectionCount = 0;
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n2 = projectedNodes[j];
          
          // distance formula in projected 2D space
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            connectionCount++;
            const alpha = (1 - dist / 45) * 0.25 * n1.scale;
            ctx.strokeStyle = n1.color === '#00f5ff' 
              ? `rgba(0, 245, 255, ${alpha})` 
              : `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            if (connectionCount > 3) break; // limit connections per node
          }
        }
      }

      // Draw holographic outer orbit rings
      ctx.lineWidth = 1.5;
      const drawOrbitRing = (radiusX: number, radiusY: number, rotateAngle: number, color: string, speedOffset: number) => {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(rotateAngle + time * speedOffset);
        
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Draw active tracking dots on the orbits
        const dotAngle = time * 1.5;
        const dotX = Math.cos(dotAngle) * radiusX;
        const dotY = Math.sin(dotAngle) * radiusY;
        ctx.fillStyle = '#00f5ff';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      };

      // Pulse orbits
      const ringPulse = Math.sin(time * 0.8) * 5;
      drawOrbitRing(165 + ringPulse, 40, Math.PI / 6, 'rgba(0, 245, 255, 0.15)', 0.1);
      drawOrbitRing(180, 50 - ringPulse, -Math.PI / 4, 'rgba(139, 92, 246, 0.15)', -0.07);

      // Draw nodes
      projectedNodes.forEach(node => {
        const opacity = (node.z + 140) / 280 * 0.8 + 0.2; // fade back nodes
        
        // Glow effect for key nodes
        if (node.pulse > 0.8 && node.scale > 1.0) {
          ctx.shadowBlur = 10 * node.scale;
          ctx.shadowColor = node.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = node.color === '#00f5ff' 
          ? `rgba(0, 245, 255, ${opacity})` 
          : `rgba(139, 92, 246, ${opacity})`;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (1 + node.pulse * 0.3), 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw center core glow
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#00f5ff';
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 60);
      gradient.addColorStop(0, 'rgba(0, 245, 255, 0.25)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.12)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 80, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadows
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex justify-center items-center">
      {/* Dynamic scanlines overlaying the canvas */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#050816_90%] pointer-events-none z-10" />
      <canvas ref={canvasRef} className="w-full h-full max-w-[500px] max-h-[500px]" />
    </div>
  );
}
