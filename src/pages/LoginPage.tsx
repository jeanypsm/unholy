import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import WatchingEye from "@/components/WatchingEye";
import { Lock, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay
    await new Promise((r) => setTimeout(r, 800));

    const success = login(username, password);
    
    if (success) {
      navigate("/admin");
    } else {
      setError("Credenciais inválidas. Acesso negado.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(0_0%_0%/0.03)_2px,hsl(0_0%_0%/0.03)_4px)]" />

      <div className="flex min-h-screen">
        {/* Left side - Eye */}
        <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 lg:flex">
          <WatchingEye />
        </div>

        {/* Right side - Login form */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:px-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/50 bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-[0.2em] text-bone">
                <span className="text-primary">ÁREA</span> RESTRITA
              </h1>
              <p className="mt-4 font-mono text-sm text-ash">
                Acesso exclusivo para administradores
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ash">
                  Usuário
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-primary/30 bg-card px-4 py-3 font-mono text-bone placeholder:text-ash/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ash">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-primary/30 bg-card px-4 py-3 font-mono text-bone placeholder:text-ash/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="••••••••••"
                  required
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full border border-primary bg-primary py-4 font-display text-sm font-bold uppercase tracking-widest text-background transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--blood)/0.5)] disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Verificando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-12 text-center">
              <a
                href="/"
                className="font-mono text-xs text-ash transition-colors hover:text-primary"
              >
                ← Voltar para o site
              </a>
            </div>

            {/* Warning */}
            <div className="mt-8 border border-primary/20 bg-primary/5 p-4 text-center">
              <p className="font-mono text-xs text-ash">
                ⚠ Tentativas de acesso não autorizado serão registradas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
