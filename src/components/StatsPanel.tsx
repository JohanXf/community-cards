import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatsPanelProps {
  totalCards: number;
  claimedCards: number;
  activeUsers: number;
  rarityDistribution: {
    common: number;
    uncommon: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}

export function StatsPanel({ 
  totalCards = 5000, 
  claimedCards = 1247, 
  activeUsers = 892,
  rarityDistribution = {
    common: 45,
    uncommon: 30,
    rare: 15,
    epic: 8,
    legendary: 2
  }
}: StatsPanelProps) {
  const progressPercentage = (claimedCards / totalCards) * 100;

  const stats = [
    {
      label: "Total Cards",
      value: totalCards.toLocaleString(),
      icon: Award,
      gradient: "bg-gradient-primary"
    },
    {
      label: "Cards Claimed",
      value: claimedCards.toLocaleString(),
      icon: Sparkles,
      gradient: "bg-gradient-secondary"
    },
    {
      label: "Active Members",
      value: activeUsers.toLocaleString(),
      icon: Users,
      gradient: "bg-gradient-primary"
    },
    {
      label: "Progress",
      value: `${progressPercentage.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: "bg-gradient-secondary"
    }
  ];

  const rarityData = [
    { name: 'Common', value: rarityDistribution.common, color: 'rarity-common' },
    { name: 'Uncommon', value: rarityDistribution.uncommon, color: 'rarity-uncommon' },
    { name: 'Rare', value: rarityDistribution.rare, color: 'rarity-rare' },
    { name: 'Epic', value: rarityDistribution.epic, color: 'rarity-epic' },
    { name: 'Legendary', value: rarityDistribution.legendary, color: 'rarity-legendary' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.gradient} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Community Growth</h3>
          <span className="text-sm text-muted-foreground">
            {claimedCards} / {totalCards}
          </span>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-muted"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{(totalCards / 2).toLocaleString()}</span>
            <span>{totalCards.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">
              {(totalCards - claimedCards).toLocaleString()}
            </span> cards remaining
          </p>
        </div>
      </motion.div>

      {/* Rarity Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-foreground mb-6">Rarity Distribution</h3>
        
        <div className="space-y-4">
          {rarityData.map((rarity, index) => (
            <motion.div
              key={rarity.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${rarity.color}`} />
                <span className="text-sm font-medium text-foreground">{rarity.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{rarity.value}%</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-center">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Most Rare</p>
              <p className="text-rarity-legendary font-semibold text-sm">Legendary Cards</p>
              <p className="text-xs text-muted-foreground">Only {rarityDistribution.legendary}% of all cards</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}