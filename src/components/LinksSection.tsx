import { MessageCircle, Users, Instagram, Skull, Crown, ArrowRight, Music, Gamepad2, Film, BookOpen, Heart, Zap, Globe, Youtube, Twitter, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import LinkCard from "./LinkCard";

const getIconForLink = (title: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Grupo Principal": <Users className="h-6 w-6" />,
    "WhatsApp": <MessageCircle className="h-6 w-6" />,
    "Discord": <Skull className="h-6 w-6" />,
    "Telegram": <Crown className="h-6 w-6" />,
    "Instagram": <Instagram className="h-6 w-6" />,
    "Twitter/X": <Twitter className="h-6 w-6" />,
    "YouTube": <Youtube className="h-6 w-6" />,
    "Playlists": <Music className="h-6 w-6" />,
    "Gaming": <Gamepad2 className="h-6 w-6" />,
    "Filmes": <Film className="h-6 w-6" />,
    "Regras": <BookOpen className="h-6 w-6" />,
    "Parcerias": <Heart className="h-6 w-6" />,
    "Novidades": <Zap className="h-6 w-6" />,
    "Site Oficial": <Globe className="h-6 w-6" />,
  };
  return iconMap[title] || <Link2 className="h-6 w-6" />;
};

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
          {homeLinks.map((link, index) => (
            <div
              key={link.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <LinkCard 
                title={link.title}
                description={link.description}
                href={link.href}
                icon={getIconForLink(link.title)}
              />
            </div>
          ))}
        </div>

        {/* Ver todos os links */}
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
