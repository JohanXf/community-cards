import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Users, Sparkles, Loader2, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommunityCard, CardData } from "./CommunityCard";
import { useToast } from "@/hooks/use-toast";
import { checkTwitterEligibility, getRoleFromBio, TwitterUser } from "@/lib/twitter-api";

interface FormData {
  username: string;
}

interface EligibilityFormProps {
  onSubmit: (data: CardData) => void;
}

export function EligibilityForm({ onSubmit }: EligibilityFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isChecking, setIsChecking] = useState(false);
  const [twitterUser, setTwitterUser] = useState<TwitterUser | null>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [previewData, setPreviewData] = useState<CardData | null>(null);
  const { toast } = useToast();

  // Rarity system based on followers
  const getRarityFromFollowers = (followers: number): CardData['rarity'] => {
    if (followers >= 10000) return 'legendary';
    if (followers >= 5000) return 'epic';
    if (followers >= 2000) return 'rare';
    if (followers >= 1000) return 'uncommon';
    return 'common';
  };

  // Check Twitter eligibility
  const handleCheckEligibility = async (data: FormData) => {
    setIsChecking(true);
    setTwitterUser(null);
    setIsEligible(false);
    setPreviewData(null);

    try {
      const result = await checkTwitterEligibility(data.username);
      
      if (result.success && result.user) {
        setTwitterUser(result.user);
        const eligible = result.user.followers_count >= 500;
        setIsEligible(eligible);

        if (eligible) {
          const role = getRoleFromBio(result.user.description);
          const rarity = getRarityFromFollowers(result.user.followers_count);
          
          const cardData: CardData = {
            username: `@${result.user.username}`,
            role,
            followers: result.user.followers_count,
            rarity,
            cardId: Math.floor(Math.random() * 5000) + 1,
            platform: 'twitter',
          };
          
          setPreviewData(cardData);
          
          toast({
            title: eligible ? "✅ Eligible!" : "❌ Not Eligible",
            description: eligible 
              ? `You qualify for a ${rarity} Community Card!`
              : "You need at least 500 followers to claim a card.",
            variant: eligible ? "default" : "destructive",
          });
        } else {
          toast({
            title: "❌ Not Eligible",
            description: `You have ${result.user.followers_count} followers. You need at least 500 to claim a card.`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Could not find Twitter user. Please check the username.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to check Twitter eligibility. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleClaimCard = () => {
    if (!previewData || !isEligible) {
      toast({
        title: "❌ Cannot Claim Card",
        description: "Please check your eligibility first.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(previewData);
    
    toast({
      title: "🎉 Card Claimed Successfully!",
      description: `Your ${previewData.rarity} Community Card has been generated!`,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Claim with X</h2>
          </div>
          <p className="text-muted-foreground">
            Connect your X (Twitter) account to automatically verify your 500+ followers and claim your Community Card
          </p>
        </div>

        <div className="space-y-6">
          {/* Username Input */}
          <form onSubmit={handleSubmit(handleCheckEligibility)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">X (Twitter) Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Enter username"
                  {...register("username", { 
                    required: "Username is required",
                    pattern: {
                      value: /^@?[a-zA-Z0-9_]+$/,
                      message: "Invalid username format"
                    }
                  })}
                  className="glass pl-12"
                  disabled={isChecking}
                />
                <Twitter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              {errors.username && (
                <p className="text-destructive text-sm">{errors.username.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Check without connecting first.
              </p>
            </div>

            {/* Check Eligibility Button */}
            <Button
              type="submit"
              disabled={isChecking}
              className="w-full bg-gradient-secondary hover:shadow-secondary transition-all duration-300 font-semibold"
              size="lg"
            >
              {isChecking ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Twitter className="w-4 h-4 mr-2" />
              )}
              {isChecking ? "Checking Eligibility..." : "Check Eligibility"}
            </Button>
          </form>

          {/* Twitter User Info */}
          {twitterUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 rounded-xl space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {twitterUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{twitterUser.name}</h3>
                  <p className="text-sm text-muted-foreground">@{twitterUser.username}</p>
                </div>
                {twitterUser.verified && (
                  <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Followers:</span>
                <span className="font-semibold text-foreground">
                  {twitterUser.followers_count.toLocaleString()}
                </span>
              </div>

              {isEligible ? (
                <div className="flex items-center gap-2 text-success text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>✅ Eligible for Community Card!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>❌ Need {500 - twitterUser.followers_count} more followers</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Claim Card Button */}
          {isEligible && previewData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={handleClaimCard}
                className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 font-semibold"
                size="lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Claim Your {previewData.rarity.charAt(0).toUpperCase() + previewData.rarity.slice(1)} Card
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center space-y-6"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">Card Preview</h3>
          <p className="text-muted-foreground text-sm">
            Your card will appear here after eligibility check
          </p>
        </div>

        <div className="relative">
          {previewData ? (
            <CommunityCard data={previewData} animated={true} size="large" />
          ) : (
            <div className="w-80 h-50 glass-card rounded-xl flex flex-col items-center justify-center space-y-4 card-aspect">
              <Twitter className="w-12 h-12 text-muted-foreground" />
              <div className="text-center">
                <p className="text-muted-foreground">Enter your X username to</p>
                <p className="text-muted-foreground">check eligibility</p>
              </div>
            </div>
          )}
        </div>

        {previewData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-success">
              ✨ Congratulations! You qualify for a <span className={`text-rarity-${previewData.rarity} font-semibold`}>
                {previewData.rarity.charAt(0).toUpperCase() + previewData.rarity.slice(1)}
              </span> card
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}