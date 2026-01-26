import { Crown, Skull } from "lucide-react";

interface Member {
  nick: string;
  role: string;
  description: string;
  avatar: string;
}

const members: Member[] = [
  {
    nick: "DARKL0RD",
    role: "Fundador",
    description: "Líder supremo da UNHOLY. Mestre das sombras e guardião dos segredos da aliança.",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=dark&backgroundColor=0a0a0a&baseColor=8b0000",
  },
  {
    nick: "NIGHTSHADE",
    role: "Co-Fundador",
    description: "Braço direito nas trevas. Estrategista e mentor dos novos membros.",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=night&backgroundColor=0a0a0a&baseColor=8b0000",
  },
];

const MembersSection = () => {
  return (
    <section className="relative px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary" />
            <Skull className="h-6 w-6 text-primary" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-[0.3em] text-bone sm:text-4xl">
            <span className="text-primary">[ </span>
            NÓS
            <span className="text-primary"> ]</span>
          </h2>
          <p className="mt-4 font-mono text-sm text-ash">
            Os guardiões da UNHOLY ALIANÇA
          </p>
        </div>

        {/* Members grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {members.map((member, index) => (
            <div
              key={member.nick}
              className="animate-fade-in-up group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card */}
              <div className="relative overflow-hidden border border-primary/20 bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:bg-secondary">
                {/* Corner decorations */}
                <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex gap-5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="h-20 w-20 overflow-hidden border-2 border-primary/30 bg-void p-1 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--blood)/0.5)]">
                      <img
                        src={member.avatar}
                        alt={member.nick}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Role badge */}
                    {member.role === "Fundador" && (
                      <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center bg-primary">
                        <Crown className="h-3 w-3 text-background" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-bone transition-colors group-hover:text-primary">
                      {member.nick}
                    </h3>
                    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
                      {member.role}
                    </p>
                    <p className="font-mono text-sm leading-relaxed text-ash">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Join hint */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ash/50">
            ··· mais membros em breve ···
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
