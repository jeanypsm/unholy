import HeroSection from "@/components/HeroSection";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleCanvas from "@/components/ParticleCanvas";
import BloodDrip from "@/components/BloodDrip";
import FloatingSymbols from "@/components/FloatingSymbols";
import GlitchOverlay from "@/components/GlitchOverlay";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Canvas interativos */}
      <FloatingSymbols />
      <BloodDrip />
      <ParticleCanvas />
      <GlitchOverlay />
      
      {/* Linha de progresso */}
      <ScrollProgress />
      
      {/* Global scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(0_0%_0%/0.03)_2px,hsl(0_0%_0%/0.03)_4px)]" />
      
      <HeroSection />
      <LinksSection />
      <Footer />
    </div>
  );
};

export default Index;
