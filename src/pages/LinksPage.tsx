import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, ExternalLink, MessageCircle, Users, Instagram, Music, Gamepad2, Film, BookOpen, Skull, Crown, Heart, Zap, Globe, Youtube, Twitter } from "lucide-react";
import GridCanvas from "@/components/GridCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import MouseFollower from "@/components/MouseFollower";

interface LinkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: React.ReactNode;
}

const allLinks: LinkItem[] = [
  // Grupos
  { id: "1", title: "Grupo Principal", description: "Grupo oficial da UNHOLY", category: "Grupos", href: "#", icon: <Users className="h-5 w-5" /> },
  { id: "2", title: "WhatsApp", description: "Grupo de WhatsApp", category: "Grupos", href: "#", icon: <MessageCircle className="h-5 w-5" /> },
  { id: "3", title: "Discord", description: "Servidor exclusivo", category: "Grupos", href: "#", icon: <Skull className="h-5 w-5" /> },
  { id: "4", title: "Telegram", description: "Canal de avisos", category: "Grupos", href: "#", icon: <Crown className="h-5 w-5" /> },
  
  // Redes Sociais
  { id: "5", title: "Instagram", description: "@unholy.alianca", category: "Redes Sociais", href: "#", icon: <Instagram className="h-5 w-5" /> },
  { id: "6", title: "Twitter/X", description: "@unholyalianca", category: "Redes Sociais", href: "#", icon: <Twitter className="h-5 w-5" /> },
  { id: "7", title: "YouTube", description: "Canal oficial", category: "Redes Sociais", href: "#", icon: <Youtube className="h-5 w-5" /> },
  
  // Entretenimento
  { id: "8", title: "Playlists", description: "Músicas da aliança", category: "Entretenimento", href: "#", icon: <Music className="h-5 w-5" /> },
  { id: "9", title: "Gaming", description: "Servidor de jogos", category: "Entretenimento", href: "#", icon: <Gamepad2 className="h-5 w-5" /> },
  { id: "10", title: "Filmes", description: "Recomendações", category: "Entretenimento", href: "#", icon: <Film className="h-5 w-5" /> },
  
  // Outros
  { id: "11", title: "Regras", description: "Leia antes de entrar", category: "Outros", href: "#", icon: <BookOpen className="h-5 w-5" /> },
  { id: "12", title: "Parcerias", description: "Alianças parceiras", category: "Outros", href: "#", icon: <Heart className="h-5 w-5" /> },
  { id: "13", title: "Novidades", description: "Últimas atualizações", category: "Outros", href: "#", icon: <Zap className="h-5 w-5" /> },
  { id: "14", title: "Site Oficial", description: "Página principal", category: "Outros", href: "#", icon: <Globe className="h-5 w-5" /> },
];

const categories = ["Todos", "Grupos", "Redes Sociais", "Entretenimento", "Outros"];

const LinksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredLinks = allLinks.filter((link) => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || link.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Canvas de grid interativo */}
      <GridCanvas />
      
      {/* Mouse follower */}
      <MouseFollower />
      
      {/* Scroll progress */}
      <ScrollProgress />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(0_0%_0%/0.03)_2px,hsl(0_0%_0%/0.03)_4px)]" />

      {/* Header */}
      <header className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-ash transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </Link>
          
          <h1 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-bone">
            <span className="text-primary">UNHOLY</span> LINKS
          </h1>
          
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-20 mx-auto max-w-4xl px-4 py-12">
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
            <input
              type="text"
              placeholder="Pesquisar links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-primary/30 bg-card py-4 pl-12 pr-4 font-mono text-bone placeholder:text-ash/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-ash hover:text-primary"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                activeCategory === category
                  ? "border-primary bg-primary text-background"
                  : "border-primary/30 bg-transparent text-ash hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mb-6 font-mono text-sm text-ash">
          {filteredLinks.length} link{filteredLinks.length !== 1 ? "s" : ""} encontrado{filteredLinks.length !== 1 ? "s" : ""}
        </p>

        {/* Links grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-in-up group relative overflow-hidden border border-primary/20 bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:bg-secondary"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Corner accent */}
              <div className="absolute right-0 top-0 h-8 w-8 border-b border-l border-primary/20 bg-primary/5 transition-colors group-hover:border-primary/50 group-hover:bg-primary/10" />
              
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all group-hover:border-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--blood)/0.5)]">
                  {link.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-bone transition-colors group-hover:text-primary">
                    {link.title}
                  </h3>
                  <p className="font-mono text-xs text-ash">{link.description}</p>
                </div>

                {/* Arrow */}
                <ExternalLink className="h-4 w-4 text-ash/50 transition-all group-hover:text-primary" />
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_hsl(var(--blood))]" />
            </a>
          ))}
        </div>

        {/* No results */}
        {filteredLinks.length === 0 && (
          <div className="py-20 text-center">
            <Skull className="mx-auto mb-4 h-12 w-12 text-primary/30" />
            <p className="font-mono text-ash">Nenhum link encontrado</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Todos");
              }}
              className="mt-4 font-mono text-sm text-primary hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-primary/20 py-8 text-center">
        <p className="font-mono text-xs text-ash/50">
          UNHOLY ALIANÇA © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default LinksPage;
