import { useEffect, useRef } from "react";

const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const gridSize = 50;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // Desenhar grid
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Distância do mouse
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          // Intensidade baseada na distância
          const intensity = Math.max(0, 1 - dist / maxDist);
          
          // Pulso baseado no tempo
          const pulse = Math.sin(time + i * 0.3 + j * 0.3) * 0.5 + 0.5;

          // Cor e tamanho do ponto
          const alpha = 0.1 + intensity * 0.5 + pulse * 0.1;
          const size = 1 + intensity * 3;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(0, 85%, ${45 + intensity * 20}%, ${alpha})`;
          
          if (intensity > 0.3) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(0, 100%, 50%, ${intensity})`;
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fill();

          // Linhas conectando pontos próximos ao mouse
          if (intensity > 0.2) {
            // Conectar ao ponto da direita
            if (i < cols - 1) {
              const nextX = (i + 1) * gridSize;
              const nextDist = Math.sqrt(
                Math.pow(mouseRef.current.x - nextX, 2) + 
                Math.pow(mouseRef.current.y - y, 2)
              );
              const nextIntensity = Math.max(0, 1 - nextDist / maxDist);
              
              if (nextIntensity > 0.2) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nextX, y);
                ctx.strokeStyle = `hsla(0, 85%, 45%, ${Math.min(intensity, nextIntensity) * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }

            // Conectar ao ponto de baixo
            if (j < rows - 1) {
              const nextY = (j + 1) * gridSize;
              const nextDist = Math.sqrt(
                Math.pow(mouseRef.current.x - x, 2) + 
                Math.pow(mouseRef.current.y - nextY, 2)
              );
              const nextIntensity = Math.max(0, 1 - nextDist / maxDist);
              
              if (nextIntensity > 0.2) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, nextY);
                ctx.strokeStyle = `hsla(0, 85%, 45%, ${Math.min(intensity, nextIntensity) * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
    />
  );
};

export default GridCanvas;
