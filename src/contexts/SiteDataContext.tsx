import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Member {
  id: string;
  nick: string;
  role: string;
  description: string;
  avatar: string;
}

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
}

export interface SiteData {
  allianceName: string;
  allianceSubtitle: string;
  tagline: string;
  members: Member[];
  links: LinkItem[];
}

const defaultData: SiteData = {
  allianceName: "UNHOLY",
  allianceSubtitle: "ALIANÇA",
  tagline: "CENTRAL DA ALIANÇA",
  members: [
    {
      id: "1",
      nick: "DARKL0RD",
      role: "Fundador",
      description: "Líder supremo da UNHOLY. Mestre das sombras e guardião dos segredos da aliança.",
      avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=dark&backgroundColor=0a0a0a&baseColor=8b0000",
    },
    {
      id: "2",
      nick: "NIGHTSHADE",
      role: "Co-Fundador",
      description: "Braço direito nas trevas. Estrategista e mentor dos novos membros.",
      avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=night&backgroundColor=0a0a0a&baseColor=8b0000",
    },
  ],
  links: [
    { id: "1", title: "Grupo Principal", description: "Grupo oficial da UNHOLY", category: "Grupos", href: "#" },
    { id: "2", title: "WhatsApp", description: "Grupo de WhatsApp", category: "Grupos", href: "#" },
    { id: "3", title: "Discord", description: "Servidor exclusivo", category: "Grupos", href: "#" },
    { id: "4", title: "Telegram", description: "Canal de avisos", category: "Grupos", href: "#" },
    { id: "5", title: "Instagram", description: "@unholy.alianca", category: "Redes Sociais", href: "#" },
    { id: "6", title: "Twitter/X", description: "@unholyalianca", category: "Redes Sociais", href: "#" },
    { id: "7", title: "YouTube", description: "Canal oficial", category: "Redes Sociais", href: "#" },
    { id: "8", title: "Playlists", description: "Músicas da aliança", category: "Entretenimento", href: "#" },
    { id: "9", title: "Gaming", description: "Servidor de jogos", category: "Entretenimento", href: "#" },
    { id: "10", title: "Filmes", description: "Recomendações", category: "Entretenimento", href: "#" },
    { id: "11", title: "Regras", description: "Leia antes de entrar", category: "Outros", href: "#" },
    { id: "12", title: "Parcerias", description: "Alianças parceiras", category: "Outros", href: "#" },
  ],
};

interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
  addMember: (member: Omit<Member, "id">) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addLink: (link: Omit<LinkItem, "id">) => void;
  updateLink: (id: string, link: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const SiteDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem("unholy_site_data");
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("unholy_site_data", JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<SiteData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const addMember = (member: Omit<Member, "id">) => {
    const newMember = { ...member, id: Date.now().toString() };
    setData((prev) => ({ ...prev, members: [...prev.members, newMember] }));
  };

  const updateMember = (id: string, member: Partial<Member>) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, ...member } : m)),
    }));
  };

  const deleteMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }));
  };

  const addLink = (link: Omit<LinkItem, "id">) => {
    const newLink = { ...link, id: Date.now().toString() };
    setData((prev) => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const updateLink = (id: string, link: Partial<LinkItem>) => {
    setData((prev) => ({
      ...prev,
      links: prev.links.map((l) => (l.id === id ? { ...l, ...link } : l)),
    }));
  };

  const deleteLink = (id: string) => {
    setData((prev) => ({
      ...prev,
      links: prev.links.filter((l) => l.id !== id),
    }));
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        updateData,
        addMember,
        updateMember,
        deleteMember,
        addLink,
        updateLink,
        deleteLink,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within SiteDataProvider");
  }
  return context;
};
