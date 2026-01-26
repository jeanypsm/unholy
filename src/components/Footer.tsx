import { Link } from "react-router-dom";
import unholyArt from "@/assets/unholy-art.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-primary/20 px-4 py-16">
      {/* Background art */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img
          src={unholyArt}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Logo text */}
        <div className="mb-6">
          <span className="font-display text-xl font-bold uppercase tracking-[0.3em] text-primary">
            UNHOLY
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-[0.3em] text-ash">
            {" "}ALIANÇA
          </span>
        </div>

        {/* Decorative elements */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="h-1 w-1 rotate-45 bg-primary/50" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Warning label - Link to login */}
        <Link
          to="/login"
          className="mb-6 inline-block border border-primary/30 bg-primary/5 px-4 py-2 transition-all hover:border-primary hover:bg-primary/10"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ash">
            ⚠ CONTEÚDO RESTRITO ⚠
          </span>
        </Link>

        {/* Copyright */}
        <p className="font-mono text-xs text-ash/50">
          © {new Date().getFullYear()} UNHOLY ALIANÇA • TODOS OS DIREITOS RESERVADOS
        </p>

        {/* Glitch decoration */}
        <div className="mt-8 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-1 w-8 bg-primary/30"
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
