import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface LinkCardProps {
  title: string;
  description?: string;
  href: string;
  icon: ReactNode;
}

const LinkCard = ({ title, description, href, icon }: LinkCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden border-glow bg-card p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary"
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20 group-hover:glow-blood">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold uppercase tracking-wider text-bone transition-colors group-hover:text-primary">
            {title}
          </h3>
          {description && (
            <p className="mt-1 font-mono text-sm text-ash">{description}</p>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink className="h-5 w-5 text-ash transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_20px_hsl(var(--blood))]" />
    </a>
  );
};

export default LinkCard;
