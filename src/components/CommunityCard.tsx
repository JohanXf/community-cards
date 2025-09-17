import { motion } from "framer-motion";
import { Crown, Users, Star, Gem } from "lucide-react";

export interface CardData {
  username: string;
  role: string;
  followers: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  cardId: number;
  platform: string;
}

interface CommunityCardProps {
  data: CardData;
  animated?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const rarityConfig = {
  common: { icon: Users, label: 'Common', color: 'rarity-common' },
  uncommon: { icon: Star, label: 'Uncommon', color: 'rarity-uncommon' },
  rare: { icon: Gem, label: 'Rare', color: 'rarity-rare' },
  epic: { icon: Crown, label: 'Epic', color: 'rarity-epic' },
  legendary: { icon: Crown, label: 'Legendary', color: 'rarity-legendary' }
};

const sizeConfig = {
  small: 'w-48 h-30',
  medium: 'w-64 h-40',
  large: 'w-80 h-50'
};

export function CommunityCard({ data, animated = true, size = 'medium' }: CommunityCardProps) {
  const RarityIcon = rarityConfig[data.rarity].icon;
  const rarityClass = `rarity-${data.rarity}`;
  
  // Generate avatar from initials
  const getInitials = (username: string) => {
    return username.replace('@', '').substring(0, 2).toUpperCase();
  };

  const cardContent = (
    <div className={`
      glass-card rounded-xl p-6 card-aspect ${sizeConfig[size]}
      transition-all duration-300 hover:scale-105 ${rarityClass}
      relative overflow-hidden group
    `}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-card opacity-90 rounded-xl" />
      
      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header with card ID and rarity */}
        <div className="flex justify-between items-start">
          <div className="text-xs text-muted-foreground font-mono">
            #{data.cardId.toString().padStart(4, '0')}
          </div>
          <div className={`flex items-center gap-1 text-xs text-rarity-${data.rarity}`}>
            <RarityIcon className="w-3 h-3" />
            <span className="font-medium">{rarityConfig[data.rarity].label}</span>
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-3">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {getInitials(data.username)}
          </div>
          
          {/* Username */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground">{data.username}</h3>
            <p className="text-sm text-muted-foreground">{data.role}</p>
          </div>
        </div>

        {/* Footer with stats */}
        <div className="flex justify-between items-end text-xs">
          <div className="text-muted-foreground">
            <span className="font-mono">{data.platform}</span>
          </div>
          <div className="text-right">
            <div className="text-primary font-semibold">
              {data.followers.toLocaleString()}
            </div>
            <div className="text-muted-foreground">followers</div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-primary" />
    </div>
  );

  if (!animated) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      whileHover={{ 
        rotateY: 5, 
        rotateX: 5, 
        scale: 1.05,
        transition: { duration: 0.3 } 
      }}
      transition={{ duration: 0.5 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="cursor-pointer"
    >
      {cardContent}
    </motion.div>
  );
}