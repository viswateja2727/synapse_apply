import { Button } from "@/components/ui/button";
import { StarRating } from "../StarRating";
import { APPLY_GAME_CONFIG } from "../ApplyGameData";
import { RotateCcw, Home, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface ApplyEndScreenProps {
  score: number;
  correct: number;
  total: number;
  onRestart: () => void;
}

const getAccuracyEmoji = (accuracy: number): string => {
  if (accuracy > 60) return "😊";
  if (accuracy >= 40) return "😐";
  return "😢";
};

const getStars = (score: number): number => {
  const { starThresholds } = APPLY_GAME_CONFIG;
  if (score >= starThresholds.threeStars) return 3;
  if (score >= starThresholds.twoStars) return 2;
  if (score >= starThresholds.oneStar) return 1;
  return 0;
};

const getPerformanceMessage = (accuracy: number): string => {
  if (accuracy >= 90) return "Outstanding! You truly understand AI!";
  if (accuracy >= 70) return "Great job! You're getting the hang of it!";
  if (accuracy >= 50) return "Good effort! Keep practicing!";
  return "Keep learning! You'll improve!";
};

export const ApplyEndScreen = ({ score, correct, total, onRestart }: ApplyEndScreenProps) => {
  const accuracy = Math.round((correct / total) * 100);
  const stars = getStars(score);
  const emoji = getAccuracyEmoji(accuracy);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center space-y-8 max-w-lg w-full">
        {/* Completion Badge */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl animate-pulse" />
          <div className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            Learning Complete!
          </h1>
          <p className="text-muted-foreground text-lg">
            {getPerformanceMessage(accuracy)}
          </p>
        </div>

        {/* Stars */}
        <div className="flex justify-center">
          <StarRating score={score} thresholds={APPLY_GAME_CONFIG.starThresholds} />
        </div>

        {/* Stats Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
          {/* Score */}
          <div className="text-center mb-6">
            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {score}
            </div>
            <div className="text-muted-foreground font-medium">Total Points</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Correct</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {correct}/{total}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {accuracy}%
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            TRY AGAIN
          </Button>
          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2"
            >
              <Home className="w-5 h-5 mr-2" />
              HOME
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
