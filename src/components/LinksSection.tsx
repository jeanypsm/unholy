import { MessageCircle, Users, Instagram, Link2, Skull, Crown } from "lucide-react";
import LinkCard from "./LinkCard";

const links = [
  {
    title: "Grupo Principal",
    description: "Entre no grupo oficial da UNHOLY",
    href: "#",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "WhatsApp",
    description: "Grupo de WhatsApp",
    href: "#",
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    title: "Instagram",
    description: "@unholy.alianca",
    href: "#",
    icon: <Instagram className="h-6 w-6" />,
  },
  {
    title: "Discord",
    description: "Servidor exclusivo",
    href: "#",
    icon: <Skull className="h-6 w-6" />,
  },
  {
    title: "Telegram",
    description: "Canal de avisos",
    href: "#",
    icon: <Crown className="h-6 w-6" />,
  },
  {
    title: "Outros Links",
    description: "Links extras",
    href: "#",
    icon: <Link2 className="h-6 w-6" />,
  },
];

const LinksSection = () => {
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
          {links.map((link, index) => (
            <div
              key={link.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <LinkCard {...link} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
