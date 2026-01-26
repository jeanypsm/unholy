import { useEffect, useRef } from "react";

interface Symbol {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  floatOffset: number;
  floatSpeed: number;
  alpha: number;
  symbol: string;
}

const symbols = ["†", "⛧", "☠", "✟", "⚔", "◆", "✧"];

const FloatingSymbols = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<Symbol[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

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

    // Criar símbolos iniciais
    const createSymbols = () => {
      const newSymbols: Symbol[] = [];
      for (let i = 0; i < 12; i++) {
        newSymbols.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 20 + 15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: Math.random() * 0.01 + 0.005,
          alpha: Math.random() * 0.15 + 0.05,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
      symbolsRef.current = newSymbols;
    };
    createSymbols();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 1;

      symbolsRef.current.forEach((sym) => {
        sym.rotation += sym.rotationSpeed;
        const floatY = Math.sin(timeRef.current * sym.floatSpeed + sym.floatOffset) * 10;

        ctx.save();
        ctx.translate(sym.x, sym.y + floatY);
        ctx.rotate(sym.rotation);
        ctx.font = `${sym.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `hsla(0, 85%, 45%, ${sym.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(0, 100%, 50%, ${sym.alpha})`;
        ctx.fillText(sym.symbol, 0, 0);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
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

export default FloatingSymbols;
