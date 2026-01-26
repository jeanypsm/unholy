import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteData, Member, LinkItem } from "@/contexts/SiteDataContext";
import { 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Check,
  Home,
  Users,
  Link2,
  Settings
} from "lucide-react";

const AdminPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const { data, updateData, addMember, updateMember, deleteMember, addLink, updateLink, deleteLink } = useSiteData();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<"general" | "members" | "links">("general");
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);
  
  // Form states
  const [generalForm, setGeneralForm] = useState({
    allianceName: data.allianceName,
    allianceSubtitle: data.allianceSubtitle,
    tagline: data.tagline,
  });
  
  const [newMember, setNewMember] = useState<Omit<Member, "id">>({
    nick: "",
    role: "",
    description: "",
    avatar: "",
  });
  
  const [newLink, setNewLink] = useState<Omit<LinkItem, "id">>({
    title: "",
    description: "",
    category: "Grupos",
    href: "",
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSaveGeneral = () => {
    updateData(generalForm);
    alert("Configurações salvas!");
  };

  const handleAddMember = () => {
    if (newMember.nick && newMember.role) {
      addMember({
        ...newMember,
        avatar: newMember.avatar || `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${newMember.nick}&backgroundColor=0a0a0a&baseColor=8b0000`,
      });
      setNewMember({ nick: "", role: "", description: "", avatar: "" });
      setShowAddMember(false);
    }
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.href) {
      addLink(newLink);
      setNewLink({ title: "", description: "", category: "Grupos", href: "" });
      setShowAddLink(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { id: "general", label: "Geral", icon: Settings },
    { id: "members", label: "Membros", icon: Users },
    { id: "links", label: "Links", icon: Link2 },
  ];

  const categories = ["Grupos", "Redes Sociais", "Entretenimento", "Outros"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-bold uppercase tracking-wider">
              <span className="text-primary">UNHOLY</span> ADMIN
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 font-mono text-xs text-ash hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Ver Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-primary/30 px-4 py-2 font-mono text-xs text-primary transition-colors hover:bg-primary hover:text-background"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-primary/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 border-b-2 px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-ash hover:text-bone"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-bone">Configurações Gerais</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ash">
                  Nome da Aliança
                </label>
                <input
                  type="text"
                  value={generalForm.allianceName}
                  onChange={(e) => setGeneralForm({ ...generalForm, allianceName: e.target.value })}
                  className="w-full border border-primary/30 bg-card px-4 py-3 font-mono text-bone focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ash">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={generalForm.allianceSubtitle}
                  onChange={(e) => setGeneralForm({ ...generalForm, allianceSubtitle: e.target.value })}
                  className="w-full border border-primary/30 bg-card px-4 py-3 font-mono text-bone focus:border-primary focus:outline-none"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ash">
                  Tagline
                </label>
                <input
                  type="text"
                  value={generalForm.tagline}
                  onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                  className="w-full border border-primary/30 bg-card px-4 py-3 font-mono text-bone focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSaveGeneral}
              className="flex items-center gap-2 bg-primary px-6 py-3 font-mono text-sm font-bold uppercase text-background transition-colors hover:bg-primary/90"
            >
              <Save className="h-4 w-4" />
              Salvar Alterações
            </button>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-bone">Membros</h2>
              <button
                onClick={() => setShowAddMember(true)}
                className="flex items-center gap-2 bg-primary px-4 py-2 font-mono text-sm font-bold uppercase text-background"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <div className="border border-primary/30 bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-bone">Novo Membro</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Nick"
                    value={newMember.nick}
                    onChange={(e) => setNewMember({ ...newMember, nick: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Cargo"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="URL do Avatar (opcional)"
                    value={newMember.avatar}
                    onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none md:col-span-2"
                  />
                  <textarea
                    placeholder="Descrição"
                    value={newMember.description}
                    onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none md:col-span-2"
                    rows={3}
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleAddMember}
                    className="flex items-center gap-2 bg-primary px-4 py-2 font-mono text-sm text-background"
                  >
                    <Check className="h-4 w-4" />
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddMember(false)}
                    className="flex items-center gap-2 border border-primary/30 px-4 py-2 font-mono text-sm text-ash hover:text-bone"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="space-y-4">
              {data.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 border border-primary/20 bg-card p-4"
                >
                  <img
                    src={member.avatar}
                    alt={member.nick}
                    className="h-12 w-12 border border-primary/30"
                  />
                  
                  {editingMember === member.id ? (
                    <div className="flex-1 grid gap-2 md:grid-cols-3">
                      <input
                        type="text"
                        value={member.nick}
                        onChange={(e) => updateMember(member.id, { nick: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateMember(member.id, { role: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      />
                      <input
                        type="text"
                        value={member.description}
                        onChange={(e) => updateMember(member.id, { description: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-bone">{member.nick}</h3>
                      <p className="font-mono text-xs text-primary">{member.role}</p>
                      <p className="font-mono text-sm text-ash">{member.description}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                      className="p-2 text-ash hover:text-primary"
                    >
                      {editingMember === member.id ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="p-2 text-ash hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === "links" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-bone">Links</h2>
              <button
                onClick={() => setShowAddLink(true)}
                className="flex items-center gap-2 bg-primary px-4 py-2 font-mono text-sm font-bold uppercase text-background"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            {/* Add Link Form */}
            {showAddLink && (
              <div className="border border-primary/30 bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-bone">Novo Link</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Título"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none"
                  />
                  <select
                    value={newLink.category}
                    onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Descrição"
                    value={newLink.description}
                    onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={newLink.href}
                    onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleAddLink}
                    className="flex items-center gap-2 bg-primary px-4 py-2 font-mono text-sm text-background"
                  >
                    <Check className="h-4 w-4" />
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddLink(false)}
                    className="flex items-center gap-2 border border-primary/30 px-4 py-2 font-mono text-sm text-ash hover:text-bone"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Links List */}
            <div className="space-y-2">
              {data.links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-4 border border-primary/20 bg-card p-4"
                >
                  {editingLink === link.id ? (
                    <div className="flex-1 grid gap-2 md:grid-cols-4">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateLink(link.id, { title: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      />
                      <input
                        type="text"
                        value={link.description}
                        onChange={(e) => updateLink(link.id, { description: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      />
                      <select
                        value={link.category}
                        onChange={(e) => updateLink(link.id, { category: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <input
                        type="url"
                        value={link.href}
                        onChange={(e) => updateLink(link.id, { href: e.target.value })}
                        className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-bone">{link.title}</h3>
                        <span className="font-mono text-xs text-primary">[ {link.category} ]</span>
                      </div>
                      <p className="font-mono text-sm text-ash">{link.description}</p>
                      <p className="font-mono text-xs text-ash/50">{link.href}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingLink(editingLink === link.id ? null : link.id)}
                      className="p-2 text-ash hover:text-primary"
                    >
                      {editingLink === link.id ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 text-ash hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
