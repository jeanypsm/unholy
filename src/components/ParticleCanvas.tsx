import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  alpha: number;
  decay: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (x: number, y: number, isClick = false) => {
      const spread = isClick ? 30 : 5;
      return {
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        targetX: x,
        targetY: y,
        size: isClick ? Math.random() * 2 + 1 : Math.random() * 2.5 + 1,
        alpha: 1,
        decay: isClick ? 0.03 : 0.015,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Adicionar partícula suave ao mover
      particlesRef.current.push(createParticle(e.clientX, e.clientY));
      
      // Limitar número de partículas
      if (particlesRef.current.length > 60) {
        particlesRef.current = particlesRef.current.slice(-60);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Efeito menor ao clicar
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

      // Desenhar linha conectando partículas
      if (particlesRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(particlesRef.current[0].x, particlesRef.current[0].y);
        
        for (let i = 1; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i];
          const prev = particlesRef.current[i - 1];
          
          // Curva suave entre pontos
          const midX = (prev.x + p.x) / 2;
          const midY = (prev.y + p.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        
        ctx.strokeStyle = `hsla(0, 85%, 45%, 0.4)`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(0, 100%, 50%, 0.5)`;
        ctx.stroke();
      }

      // Desenhar partículas
      particlesRef.current.forEach((particle) => {
        particle.alpha -= particle.decay;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 85%, 45%, ${particle.alpha * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(0, 100%, 50%, ${particle.alpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
};

export default ParticleCanvas;
