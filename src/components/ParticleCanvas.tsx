import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

interface ClickParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const clickParticlesRef = useRef<ClickParticle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      // Explosão de partículas ao clicar
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15;
        const speed = Math.random() * 4 + 2;
        clickParticlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          alpha: 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adicionar ponto atual do mouse ao trail
      trailRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        alpha: 1,
      });

      // Manter apenas os últimos 30 pontos
      if (trailRef.current.length > 30) {
        trailRef.current.shift();
      }

      // Desenhar linha fluida seguindo o mouse
      if (trailRef.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

        for (let i = 1; i < trailRef.current.length - 1; i++) {
          const curr = trailRef.current[i];
          const next = trailRef.current[i + 1];
          const midX = (curr.x + next.x) / 2;
          const midY = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
        }

        // Gradiente ao longo da linha
        const gradient = ctx.createLinearGradient(
          trailRef.current[0].x,
          trailRef.current[0].y,
          trailRef.current[trailRef.current.length - 1].x,
          trailRef.current[trailRef.current.length - 1].y
        );
        gradient.addColorStop(0, "hsla(0, 85%, 45%, 0)");
        gradient.addColorStop(0.5, "hsla(0, 85%, 45%, 0.6)");
        gradient.addColorStop(1, "hsla(0, 85%, 50%, 1)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "hsla(0, 100%, 50%, 0.8)";
        ctx.stroke();

        // Ponto brilhante na ponta
        const lastPoint = trailRef.current[trailRef.current.length - 1];
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(0, 100%, 60%, 1)";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "hsla(0, 100%, 50%, 1)";
        ctx.fill();
      }

      // Atualizar e desenhar partículas de clique
      clickParticlesRef.current = clickParticlesRef.current.filter(
        (p) => p.alpha > 0
      );

      clickParticlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravidade
        particle.alpha -= 0.02;
        particle.vx *= 0.98; // Fricção

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 85%, 50%, ${particle.alpha})`;
        ctx.shadowBlur = 15;
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
