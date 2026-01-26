import { useEffect, useRef } from "react";

const WatchingEye = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !pupilRef.current) return;

      const eye = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10,
        25
      );

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      
      {/* Eye socket */}
      <div className="relative">
        {/* Decorative ring */}
        <div className="absolute -inset-8 rounded-full border border-primary/20" />
        <div className="absolute -inset-16 rounded-full border border-primary/10" />
        <div className="absolute -inset-24 rounded-full border border-primary/5" />
        
        {/* Symbols around eye */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <div
            key={i}
            className="absolute text-primary/30"
            style={{
              transform: `rotate(${angle}deg) translateY(-140px)`,
              transformOrigin: "center center",
              left: "50%",
              top: "50%",
              marginLeft: "-8px",
              marginTop: "-8px",
            }}
          >
            <span className="text-lg">†</span>
          </div>
        ))}

        {/* Eye */}
        <div
          ref={eyeRef}
          className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-2 border-primary/50 bg-gradient-to-br from-black via-zinc-950 to-black shadow-[0_0_60px_hsl(var(--blood)/0.3),inset_0_0_60px_hsl(0_0%_0%/0.8)]"
        >
          {/* Iris */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-950 via-red-900 to-black shadow-[inset_0_0_30px_hsl(0_0%_0%/0.5)]">
            {/* Iris pattern */}
            <div className="absolute inset-0 rounded-full opacity-50">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-full w-[2px] origin-center bg-gradient-to-b from-primary/30 to-transparent"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
            </div>

            {/* Pupil */}
            <div
              ref={pupilRef}
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-[0_0_20px_hsl(var(--blood)),inset_0_0_10px_hsl(var(--blood)/0.5)]"
              style={{ transition: "transform 0.1s ease-out" }}
            >
              {/* Reflection */}
              <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-white/30 blur-sm" />
              <div className="absolute -right-2 top-1 h-2 w-2 rounded-full bg-white/20" />
              
              {/* Inner glow */}
              <div className="h-2 w-2 rounded-full bg-primary/50 shadow-[0_0_10px_hsl(var(--blood))]" />
            </div>
          </div>

          {/* Blood veins */}
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 200">
            <path
              d="M100 0 Q90 50 100 100"
              stroke="hsl(0 85% 45%)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M200 100 Q150 90 100 100"
              stroke="hsl(0 85% 45%)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M100 200 Q110 150 100 100"
              stroke="hsl(0 85% 45%)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M0 100 Q50 110 100 100"
              stroke="hsl(0 85% 45%)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Eye shadow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Text below */}
      <div className="absolute -bottom-20 text-center">
        <p className="font-display text-sm uppercase tracking-[0.5em] text-primary/50">
          estamos observando
        </p>
      </div>
    </div>
  );
};

export default WatchingEye;
