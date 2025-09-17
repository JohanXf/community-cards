import { motion } from "framer-motion";
import { Sparkles, Twitter, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityCard, CardData } from "./CommunityCard";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const demoCard: CardData = {
  username: "@community_star",
  role: "Developer",
  followers: 2547,
  rarity: "rare",
  cardId: 1337,
  platform: "twitter"
};

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-card" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm"
            >
              <Twitter className="w-4 h-4 text-primary" />
              <span className="text-foreground">Exclusive X (Twitter) Community Recognition</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Community
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Cards
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Exclusive digital collectibles for X (Twitter) community members with 500+ followers. 
                Automatically verify your eligibility and claim your rarity tier.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm">
                <Twitter className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">X (Twitter) Integration</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">Auto Verification</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">5 Rarity Tiers</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300 font-semibold text-lg px-8"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Claim with X
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass border-primary/30 hover:bg-primary/10 font-semibold text-lg px-8"
              >
                View Gallery
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-border/30"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Cards Claimed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">892</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">3,753</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Floating Card */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <CommunityCard 
                  data={demoCard} 
                  animated={true} 
                  size="large"
                />
              </motion.div>

              {/* Background Glow Effects */}
              <div className="absolute inset-0 bg-gradient-primary/30 blur-3xl rounded-full scale-150 animate-glow" />
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-secondary/40 rounded-full blur-2xl animate-float" />
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-primary/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}