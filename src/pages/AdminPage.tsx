import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteData, Member, LinkItem } from "@/contexts/SiteDataContext";
import { iconOptions, getIconComponent } from "@/lib/icons";
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
  Settings,
  ChevronDown
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
  const [showIconPicker, setShowIconPicker] = useState<string | null>(null);
  
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
    icon: "Link2",
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
      setNewLink({ title: "", description: "", category: "Grupos", href: "", icon: "Link2" });
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

  const IconPickerButton = ({ 
    value, 
    onChange, 
    pickerId 
  }: { 
    value: string; 
    onChange: (icon: string) => void;
    pickerId: string;
  }) => {
    const IconComp = getIconComponent(value);
    const isOpen = showIconPicker === pickerId;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowIconPicker(isOpen ? null : pickerId)}
          className="flex items-center gap-2 border border-primary/30 bg-background px-3 py-2 font-mono text-sm text-bone hover:border-primary"
        >
          <IconComp className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline">{value}</span>
          <ChevronDown className="h-3 w-3 text-ash" />
        </button>
        
        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-64 overflow-y-auto border border-primary/30 bg-card p-2 shadow-xl">
            <div className="grid grid-cols-6 gap-1">
              {iconOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => {
                      onChange(opt.name);
                      setShowIconPicker(null);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                      value === opt.name
                        ? "bg-primary text-background"
                        : "text-ash hover:bg-primary/20 hover:text-primary"
                    }`}
                    title={opt.name}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="font-display text-base font-bold uppercase tracking-wider sm:text-xl">
              <span className="text-primary">UNHOLY</span> <span className="hidden sm:inline">ADMIN</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1 font-mono text-xs text-ash hover:text-primary sm:gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Ver Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 border border-primary/30 px-2 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary hover:text-background sm:gap-2 sm:px-4 sm:py-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto border-b border-primary/20 sm:mb-8 sm:gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1 whitespace-nowrap border-b-2 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors sm:gap-2 sm:px-6 sm:py-3 sm:text-sm ${
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
            <h2 className="font-display text-xl font-bold text-bone sm:text-2xl">Configurações Gerais</h2>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
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
              className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 font-mono text-sm font-bold uppercase text-background transition-colors hover:bg-primary/90 sm:w-auto"
            >
              <Save className="h-4 w-4" />
              Salvar Alterações
            </button>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-bold text-bone sm:text-2xl">Membros</h2>
              <button
                onClick={() => setShowAddMember(true)}
                className="flex items-center justify-center gap-2 bg-primary px-4 py-2 font-mono text-sm font-bold uppercase text-background"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <div className="border border-primary/30 bg-card p-4 sm:p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-bone">Novo Membro</h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none sm:col-span-2"
                  />
                  <textarea
                    placeholder="Descrição"
                    value={newMember.description}
                    onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                    className="border border-primary/30 bg-background px-4 py-2 font-mono text-bone focus:border-primary focus:outline-none sm:col-span-2"
                    rows={3}
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleAddMember}
                    className="flex items-center justify-center gap-2 bg-primary px-4 py-2 font-mono text-sm text-background"
                  >
                    <Check className="h-4 w-4" />
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddMember(false)}
                    className="flex items-center justify-center gap-2 border border-primary/30 px-4 py-2 font-mono text-sm text-ash hover:text-bone"
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
                  className="border border-primary/20 bg-card p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={member.avatar}
                      alt={member.nick}
                      className="h-12 w-12 flex-shrink-0 border border-primary/30"
                    />
                    
                    {editingMember === member.id ? (
                      <div className="flex-1 grid gap-2 sm:grid-cols-3">
                        <input
                          type="text"
                          value={member.nick}
                          onChange={(e) => updateMember(member.id, { nick: e.target.value })}
                          className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                          placeholder="Nick"
                        />
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => updateMember(member.id, { role: e.target.value })}
                          className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                          placeholder="Cargo"
                        />
                        <input
                          type="text"
                          value={member.description}
                          onChange={(e) => updateMember(member.id, { description: e.target.value })}
                          className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone sm:col-span-3"
                          placeholder="Descrição"
                        />
                      </div>
                    ) : (
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-bone">{member.nick}</h3>
                        <p className="font-mono text-xs text-primary">{member.role}</p>
                        <p className="font-mono text-sm text-ash">{member.description}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 self-end sm:self-center">
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === "links" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-bold text-bone sm:text-2xl">Links</h2>
              <button
                onClick={() => setShowAddLink(true)}
                className="flex items-center justify-center gap-2 bg-primary px-4 py-2 font-mono text-sm font-bold uppercase text-background"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            {/* Add Link Form */}
            {showAddLink && (
              <div className="border border-primary/30 bg-card p-4 sm:p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-bone">Novo Link</h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="sm:col-span-2">
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ash">
                      Ícone
                    </label>
                    <IconPickerButton
                      value={newLink.icon}
                      onChange={(icon) => setNewLink({ ...newLink, icon })}
                      pickerId="new-link"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleAddLink}
                    className="flex items-center justify-center gap-2 bg-primary px-4 py-2 font-mono text-sm text-background"
                  >
                    <Check className="h-4 w-4" />
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddLink(false)}
                    className="flex items-center justify-center gap-2 border border-primary/30 px-4 py-2 font-mono text-sm text-ash hover:text-bone"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Links List */}
            <div className="space-y-2">
              {data.links.map((link) => {
                const LinkIcon = getIconComponent(link.icon);
                return (
                  <div
                    key={link.id}
                    className="border border-primary/20 bg-card p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                        <LinkIcon className="h-5 w-5" />
                      </div>
                      
                      {editingLink === link.id ? (
                        <div className="flex-1 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => updateLink(link.id, { title: e.target.value })}
                            className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                            placeholder="Título"
                          />
                          <input
                            type="text"
                            value={link.description}
                            onChange={(e) => updateLink(link.id, { description: e.target.value })}
                            className="border border-primary/30 bg-background px-2 py-1 font-mono text-sm text-bone"
                            placeholder="Descrição"
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
                            placeholder="URL"
                          />
                          <div className="sm:col-span-2 lg:col-span-4">
                            <IconPickerButton
                              value={link.icon}
                              onChange={(icon) => updateLink(link.id, { icon })}
                              pickerId={`edit-${link.id}`}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-bold text-bone">{link.title}</h3>
                            <span className="font-mono text-xs text-primary">[ {link.category} ]</span>
                          </div>
                          <p className="font-mono text-sm text-ash">{link.description}</p>
                          <p className="font-mono text-xs text-ash/50 break-all">{link.href}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2 self-end sm:self-center">
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for icon picker */}
      {showIconPicker && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowIconPicker(null)} 
        />
      )}
    </div>
  );
};

export default AdminPage;
