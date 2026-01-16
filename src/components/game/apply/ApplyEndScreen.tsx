import { Button } from "@/components/ui/button";
import { StarRating } from "../StarRating";
import { APPLY_GAME_CONFIG } from "../ApplyGameData";
import { RotateCcw, Trophy, Target, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";

interface ApplyEndScreenProps {
  score: number;
  correct: number;
  total: number;
  onRestart: () => void;
}

const getAccuracyEmoji = (accuracy: number): string => {
  if (accuracy >= 90) return "🏆";
  if (accuracy >= 70) return "🌟";
  if (accuracy >= 50) return "👍";
  return "💪";
};

const getStars = (score: number): number => {
  const { starThresholds } = APPLY_GAME_CONFIG;
  if (score >= starThresholds.threeStars) return 3;
  if (score >= starThresholds.twoStars) return 2;
  if (score >= starThresholds.oneStar) return 1;
  return 0;
};

const getPerformanceMessage = (accuracy: number): string => {
  if (accuracy >= 90) return "Outstanding! You're an AI expert! 🎉";
  if (accuracy >= 70) return "Great job! You really understand AI!";
  if (accuracy >= 50) return "Good effort! Keep practicing!";
  return "Keep learning! You'll get better!";
};

const getPerformanceGradient = (accuracy: number): string => {
  if (accuracy >= 90) return "from-amber-400 via-yellow-300 to-orange-400";
  if (accuracy >= 70) return "from-emerald-400 via-teal-300 to-cyan-400";
  if (accuracy >= 50) return "from-sky-400 via-blue-300 to-indigo-400";
  return "from-violet-400 via-purple-300 to-fuchsia-400";
};

export const ApplyEndScreen = ({ score, correct, total, onRestart }: ApplyEndScreenProps) => {
  const accuracy = Math.round((correct / total) * 100);
  const stars = getStars(score);
  const emoji = getAccuracyEmoji(accuracy);
  const performanceGradient = getPerformanceGradient(accuracy);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <motion.div 
        className="text-center space-y-6 max-w-md w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Trophy Badge */}
        <motion.div 
          className="relative mx-auto w-28 h-28"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${performanceGradient} rounded-full blur-2xl opacity-60 animate-pulse`} />
          <div className={`relative w-full h-full bg-gradient-to-br ${performanceGradient} rounded-full flex items-center justify-center shadow-2xl`}>
            <Trophy className="w-14 h-14 text-white drop-shadow-lg" strokeWidth={1.5} />
          </div>
          {/* Sparkle decorations */}
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-warning" />
          </motion.div>
        </motion.div>

        {/* Title & Message */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-black text-foreground">
            Learning Complete!
          </h1>
          <p className="text-muted-foreground text-base font-medium">
            {getPerformanceMessage(accuracy)}
          </p>
        </motion.div>

        {/* Stars */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <StarRating score={score} thresholds={APPLY_GAME_CONFIG.starThresholds} />
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Score */}
          <div className="text-center mb-5">
            <motion.div 
              className={`text-5xl font-black bg-gradient-to-r ${performanceGradient} bg-clip-text text-transparent`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              {score}
            </motion.div>
            <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide mt-1">
              Total Points
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              className="bg-gradient-to-br from-sky-50 to-sky-100/80 rounded-2xl p-4 text-center border border-sky-200/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Correct</span>
              </div>
              <div className="text-2xl font-black text-foreground">
                {correct}<span className="text-base font-bold text-muted-foreground">/{total}</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-violet-50 to-violet-100/80 rounded-2xl p-4 text-center border border-violet-200/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Accuracy</span>
              </div>
              <div className="text-2xl font-black text-foreground flex items-center justify-center gap-1">
                {accuracy}%
                <span className="text-xl">{emoji}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Try Again Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <RotateCcw className="w-5 h-5 mr-2 group-hover:-rotate-180 transition-transform duration-500" />
            PLAY AGAIN
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};