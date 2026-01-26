import { useEffect, useRef, useState } from "react";

const GlitchOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

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

    // Glitch aleatório
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200);
      }
    }, 100);

    let animationRef: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isGlitching) {
        // Linhas de glitch horizontais
        const numLines = Math.floor(Math.random() * 5) + 2;
        for (let i = 0; i < numLines; i++) {
          const y = Math.random() * canvas.height;
          const height = Math.random() * 10 + 2;
          const offset = (Math.random() - 0.5) * 20;
          
          ctx.fillStyle = `hsla(0, 100%, 50%, ${Math.random() * 0.3})`;
          ctx.fillRect(offset, y, canvas.width, height);
        }

        // Ruído
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (Math.random() > 0.99) {
            imageData.data[i] = 139; // R
            imageData.data[i + 1] = 0; // G
            imageData.data[i + 2] = 0; // B
            imageData.data[i + 3] = Math.random() * 50; // A
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      animationRef = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(glitchInterval);
      cancelAnimationFrame(animationRef);
    };
  }, [isGlitching]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default GlitchOverlay;
