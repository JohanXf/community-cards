import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommunityCard, CardData } from "./CommunityCard";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  username: string;
  platform: string;
  followers: number;
  contribution: string;
}

interface EligibilityFormProps {
  onSubmit: (data: CardData) => void;
}

const platforms = [
  { value: 'twitter', label: 'Twitter' },
  { value: 'discord', label: 'Discord' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
];

export function EligibilityForm({ onSubmit }: EligibilityFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<FormData>();
  const [previewData, setPreviewData] = useState<CardData | null>(null);
  const [isEligible, setIsEligible] = useState(false);
  const { toast } = useToast();

  const watchedFields = watch();

  // Auto-role assignment based on contribution keywords
  const getRoleFromContribution = (contribution: string): string => {
    const lower = contribution.toLowerCase();
    if (lower.includes('develop') || lower.includes('code') || lower.includes('programming')) return 'Developer';
    if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) return 'Designer';
    if (lower.includes('content') || lower.includes('write') || lower.includes('blog')) return 'Content Creator';
    if (lower.includes('teach') || lower.includes('educate') || lower.includes('tutorial')) return 'Educator';
    if (lower.includes('community') || lower.includes('moderate') || lower.includes('manage')) return 'Community Builder';
    return 'Community Member';
  };

  // Rarity system based on followers
  const getRarityFromFollowers = (followers: number): CardData['rarity'] => {
    if (followers >= 10000) return 'legendary';
    if (followers >= 5000) return 'epic';
    if (followers >= 2000) return 'rare';
    if (followers >= 1000) return 'uncommon';
    return 'common';
  };

  // Update preview card when form changes
  useEffect(() => {
    if (watchedFields.username && watchedFields.followers && watchedFields.platform && watchedFields.contribution) {
      const followers = Number(watchedFields.followers);
      const eligible = followers >= 500;
      setIsEligible(eligible);

      if (eligible) {
        const role = getRoleFromContribution(watchedFields.contribution);
        const rarity = getRarityFromFollowers(followers);
        
        setPreviewData({
          username: watchedFields.username.startsWith('@') ? watchedFields.username : `@${watchedFields.username}`,
          role,
          followers,
          rarity,
          cardId: Math.floor(Math.random() * 5000) + 1,
          platform: watchedFields.platform,
        });
      } else {
        setPreviewData(null);
      }
    }
  }, [watchedFields]);

  const onFormSubmit = (data: FormData) => {
    if (data.followers < 500) {
      toast({
        title: "Not Eligible",
        description: "You need at least 500 followers to claim a Community Card.",
        variant: "destructive",
      });
      return;
    }

    const role = getRoleFromContribution(data.contribution);
    const rarity = getRarityFromFollowers(data.followers);
    
    const cardData: CardData = {
      username: data.username.startsWith('@') ? data.username : `@${data.username}`,
      role,
      followers: data.followers,
      rarity,
      cardId: Math.floor(Math.random() * 5000) + 1,
      platform: data.platform,
    };

    onSubmit(cardData);
    
    toast({
      title: "Card Claimed Successfully!",
      description: `Your ${rarity} Community Card has been generated.`,
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Claim Your Card</h2>
          <p className="text-muted-foreground">
            Join the exclusive community of members with 500+ followers
          </p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username/Handle</Label>
            <Input
              id="username"
              placeholder="@username"
              {...register("username", { 
                required: "Username is required",
                pattern: {
                  value: /^@?[a-zA-Z0-9_]+$/,
                  message: "Invalid username format"
                }
              })}
              className="glass"
            />
            {errors.username && (
              <p className="text-destructive text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select onValueChange={(value) => setValue("platform", value)}>
              <SelectTrigger className="glass">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent className="glass">
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Followers */}
          <div className="space-y-2">
            <Label htmlFor="followers">Follower Count</Label>
            <Input
              id="followers"
              type="number"
              placeholder="500"
              min="1"
              {...register("followers", { 
                required: "Follower count is required",
                min: { value: 500, message: "Minimum 500 followers required" },
                valueAsNumber: true
              })}
              className="glass"
            />
            {errors.followers && (
              <p className="text-destructive text-sm">{errors.followers.message}</p>
            )}
            {watchedFields.followers && Number(watchedFields.followers) < 500 && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>You need at least 500 followers to be eligible</span>
              </div>
            )}
            {isEligible && (
              <div className="flex items-center gap-2 text-success text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>You're eligible for a Community Card!</span>
              </div>
            )}
          </div>

          {/* Contribution */}
          <div className="space-y-2">
            <Label htmlFor="contribution">Community Contribution</Label>
            <Textarea
              id="contribution"
              placeholder="Describe how you contribute to the community (development, design, content creation, education, etc.)"
              {...register("contribution", { 
                required: "Please describe your contribution",
                minLength: { value: 20, message: "Please provide more details (minimum 20 characters)" }
              })}
              className="glass min-h-24"
            />
            {errors.contribution && (
              <p className="text-destructive text-sm">{errors.contribution.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || !isEligible}
            className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 font-semibold"
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Check Eligibility & Claim Card
          </Button>
        </form>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center space-y-6"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">Live Preview</h3>
          <p className="text-muted-foreground text-sm">
            Your card will appear here as you fill out the form
          </p>
        </div>

        <div className="relative">
          {previewData ? (
            <CommunityCard data={previewData} animated={true} size="large" />
          ) : (
            <div className="w-80 h-50 glass-card rounded-xl flex flex-col items-center justify-center space-y-4 card-aspect">
              <Users className="w-12 h-12 text-muted-foreground" />
              <div className="text-center">
                <p className="text-muted-foreground">Fill out the form to see</p>
                <p className="text-muted-foreground">your card preview</p>
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