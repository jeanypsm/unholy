import unholyLogo from "@/assets/unholy-logo.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_85%_45%/0.15)_0%,_transparent_60%)]" />
      
      {/* Noise overlay */}
      <div className="noise absolute inset-0" />
      
      {/* Scanlines */}
      <div className="scanlines absolute inset-0" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="animate-fade-in-up relative mb-8">
          <div className="absolute inset-0 blur-3xl">
            <div className="h-full w-full bg-primary/30" />
          </div>
          <img
            src={unholyLogo}
            alt="UNHOLY ALIANÇA"
            className="relative h-48 w-48 object-contain drop-shadow-[0_0_30px_hsl(0_85%_45%/0.5)] sm:h-64 sm:w-64 md:h-80 md:w-80"
          />
        </div>

        {/* Title */}
        <h1 
          className="animate-fade-in-up font-display text-4xl font-black uppercase tracking-[0.2em] text-bone sm:text-5xl md:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="glitch-text text-glow-blood text-primary">UNHOLY</span>
        </h1>
        <h2 
          className="animate-fade-in-up font-display text-2xl font-bold uppercase tracking-[0.4em] text-ash sm:text-3xl md:text-4xl"
          style={{ animationDelay: "0.3s" }}
        >
          ALIANÇA
        </h2>

        {/* Decorative line */}
        <div 
          className="animate-fade-in-up mt-8 flex items-center gap-4"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary" />
          <div className="h-2 w-2 rotate-45 border border-primary bg-primary/20" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Tagline */}
        <p 
          className="animate-fade-in-up mt-6 font-mono text-sm uppercase tracking-widest text-ash"
          style={{ animationDelay: "0.5s" }}
        >
          [ CENTRAL DA ALIANÇA ]
        </p>

        {/* Scroll indicator */}
        <div 
          className="animate-fade-in-up mt-16 flex flex-col items-center gap-2"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ash/50">
            role para baixo
          </span>
          <div className="animate-float h-6 w-4 rounded-full border border-ash/30 p-1">
            <div className="pulse-blood h-2 w-full rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
