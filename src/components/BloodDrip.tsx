import { useEffect, useRef } from "react";

interface Drip {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
}

const BloodDrip = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dripsRef = useRef<Drip[]>([]);
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

    // Criar gotas iniciais
    const createDrip = () => ({
      x: Math.random() * window.innerWidth,
      y: -50,
      speed: Math.random() * 2 + 1,
      length: Math.random() * 80 + 40,
      alpha: Math.random() * 0.3 + 0.1,
    });

    // Spawnar gotas periodicamente
    const spawnInterval = setInterval(() => {
      if (dripsRef.current.length < 15) {
        dripsRef.current.push(createDrip());
      }
    }, 500);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dripsRef.current = dripsRef.current.filter(
        (d) => d.y - d.length < canvas.height
      );

      dripsRef.current.forEach((drip) => {
        drip.y += drip.speed;

        // Gradiente para a gota
        const gradient = ctx.createLinearGradient(
          drip.x,
          drip.y - drip.length,
          drip.x,
          drip.y
        );
        gradient.addColorStop(0, `hsla(0, 85%, 45%, 0)`);
        gradient.addColorStop(0.5, `hsla(0, 85%, 45%, ${drip.alpha})`);
        gradient.addColorStop(1, `hsla(0, 85%, 35%, ${drip.alpha * 1.5})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.moveTo(drip.x, drip.y - drip.length);
        ctx.lineTo(drip.x, drip.y);
        ctx.stroke();

        // Gota na ponta
        ctx.beginPath();
        ctx.arc(drip.x, drip.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 85%, 40%, ${drip.alpha * 1.5})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(0, 100%, 50%, ${drip.alpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(spawnInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
};

export default BloodDrip;
