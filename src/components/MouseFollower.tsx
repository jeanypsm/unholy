import { useEffect, useRef } from "react";

const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Smooth follow com easing
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.1;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.1;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${posRef.current.x - 25}px, ${posRef.current.y - 25}px)`;
      }

      if (innerRef.current) {
        // Rotação baseada no movimento
        const dx = targetRef.current.x - posRef.current.x;
        const dy = targetRef.current.y - posRef.current.y;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        innerRef.current.style.transform = `rotate(${rotation}deg)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      {/* Outer ring */}
      <div className="relative h-[50px] w-[50px]">
        {/* Pentagram/symbol */}
        <div
          ref={innerRef}
          className="absolute inset-0 flex items-center justify-center text-primary opacity-60"
          style={{ filter: "drop-shadow(0 0 10px hsl(0 85% 45%))" }}
        >
          <svg viewBox="0 0 50 50" className="h-full w-full">
            {/* Cross symbol */}
            <line
              x1="25"
              y1="5"
              x2="25"
              y2="45"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="10"
              y1="20"
              x2="40"
              y2="20"
              stroke="currentColor"
              strokeWidth="1"
            />
            {/* Circle */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
            {/* Inner diamond */}
            <polygon
              points="25,10 40,25 25,40 10,25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--blood))]" />
      </div>
    </div>
  );
};

export default MouseFollower;
