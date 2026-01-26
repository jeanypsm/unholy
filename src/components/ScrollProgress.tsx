import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Linha vertical de progresso */}
      <div className="fixed left-4 top-0 z-40 h-full w-[2px] bg-primary/10 sm:left-8">
        {/* Linha preenchida */}
        <div
          className="w-full bg-primary transition-all duration-150 ease-out"
          style={{
            height: `${scrollProgress}%`,
            boxShadow: "0 0 20px hsl(var(--blood)), 0 0 40px hsl(var(--blood) / 0.5)",
          }}
        />
        
        {/* Ponto indicador */}
        <div
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background transition-all duration-150"
          style={{
            top: `${scrollProgress}%`,
            transform: `translate(-50%, -50%)`,
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
