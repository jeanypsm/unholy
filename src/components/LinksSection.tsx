import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { getIconComponent } from "@/lib/icons";
import LinkCard from "./LinkCard";

const LinksSection = () => {
  const { data } = useSiteData();
  
  // Pegar os primeiros 5 links para mostrar na home
  const homeLinks = data.links.slice(0, 5);

  return (
    <section className="relative px-4 py-20">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.3em] text-bone sm:text-3xl">
            <span className="text-primary">[ </span>
            LINKS
            <span className="text-primary"> ]</span>
          </h2>
          <p className="mt-4 font-mono text-sm text-ash">
            Acesse nossos grupos e redes sociais
          </p>
        </div>

        {/* Links grid */}
        <div className="grid gap-4">
          {homeLinks.map((link, index) => {
            const IconComp = getIconComponent(link.icon);
            return (
              <div
                key={link.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <LinkCard 
                  title={link.title}
                  description={link.description}
                  href={link.href}
                  icon={<IconComp className="h-6 w-6" />}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/links"
            className="group inline-flex items-center gap-3 border border-primary bg-primary/10 px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-background hover:shadow-[0_0_30px_hsl(var(--blood)/0.5)]"
          >
            <span>Ver Todos os Links</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 font-mono text-xs text-ash/50">
            Coletânea completa de links da aliança
          </p>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
