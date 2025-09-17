import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { StatsPanel } from "@/components/StatsPanel";
import { EligibilityForm } from "@/components/EligibilityForm";
import { CardData } from "@/components/CommunityCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [claimedCard, setClaimedCard] = useState<CardData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleCardClaim = (cardData: CardData) => {
    setClaimedCard(cardData);
    toast({
      title: "🎉 Congratulations!",
      description: `Your ${cardData.rarity} Community Card has been successfully claimed!`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Community <span className="text-primary">Statistics</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track the growth of our exclusive community and see how members are contributing across different platforms.
            </p>
          </motion.div>

          <StatsPanel
            totalCards={5000}
            claimedCards={1247}
            activeUsers={892}
            rarityDistribution={{
              common: 45,
              uncommon: 30,
              rare: 15,
              epic: 8,
              legendary: 2
            }}
          />
        </div>
      </section>

      {/* Eligibility Form Section */}
      <section ref={formRef} className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Join the <span className="text-secondary">Elite?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Prove your community impact with 500+ followers and get your exclusive Community Card. 
              Your role and rarity will be automatically determined based on your contribution.
            </p>
          </motion.div>

          <EligibilityForm onSubmit={handleCardClaim} />
        </div>
      </section>

      {/* Success Message */}
      {claimedCard && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  🎉 Welcome to the Community!
                </h3>
                <p className="text-muted-foreground">
                  Your <span className={`text-rarity-${claimedCard.rarity} font-semibold`}>
                    {claimedCard.rarity.charAt(0).toUpperCase() + claimedCard.rarity.slice(1)}
                  </span> card #{claimedCard.cardId.toString().padStart(4, '0')} has been minted successfully.
                </p>
              </div>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>🔗 Your card will be available in your wallet within 24 hours</p>
                <p>🎨 You can now use your card as a profile badge</p>
                <p>🚀 Join our exclusive Discord channel for cardholders</p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">Community Cards</h3>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Recognizing and celebrating community members who make a difference. 
              Join the exclusive club of contributors with 500+ followers.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <span>© 2024 Community Cards</span>
              <span>•</span>
              <span>Limited Edition</span>
              <span>•</span>
              <span>Powered by Community</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;