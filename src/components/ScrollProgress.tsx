import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;

      // Atualização direta sem transição CSS
      if (lineRef.current) {
        lineRef.current.style.height = `${progress}%`;
      }
      if (dotRef.current) {
        dotRef.current.style.top = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Linha vertical de progresso */}
      <div className="fixed left-4 top-0 z-40 h-full w-[2px] bg-primary/10 sm:left-8">
        {/* Linha preenchida */}
        <div
          ref={lineRef}
          className="w-full bg-primary"
          style={{
            height: "0%",
            boxShadow: "0 0 20px hsl(var(--blood)), 0 0 40px hsl(var(--blood) / 0.5)",
          }}
        />
        
        {/* Ponto indicador */}
        <div
          ref={dotRef}
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background"
          style={{
            top: "0%",
            boxShadow: "0 0 15px hsl(var(--blood))",
          }}
        />
      </div>

      {/* Marcadores de seção */}
      <div className="fixed left-4 top-0 z-30 flex h-full w-[2px] flex-col justify-between py-20 sm:left-8">
        {[0, 50, 100].map((pos) => (
          <div
            key={pos}
            className="h-2 w-2 -translate-x-[3px] rotate-45 border border-primary/30 bg-background"
          />
        ))}
      </div>
    </>
  );
};

export default ScrollProgress;
