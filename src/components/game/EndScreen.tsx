import { RotateCcw, Trophy, Target, Sparkles, Lightbulb } from 'lucide-react';
import { BrainMascot } from './BrainMascot';
import { StarRating } from './StarRating';
import { Confetti } from './Confetti';
import { Button } from '@/components/ui/button';
import { AI_CONCEPTS, GAME_CONFIG } from './GameData';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface EndScreenProps {
  score: number;
  matched: number;
  onRestart: () => void;
}

export const EndScreen = ({ score, matched, onRestart }: EndScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const totalConcepts = AI_CONCEPTS.length;
  const accuracy = totalConcepts > 0 ? Math.round((matched / totalConcepts) * 100) : 0;

  const getStarCount = (): number => {
    const { starThresholds } = GAME_CONFIG;
    if (score >= starThresholds.threeStars) return 3;
    if (score >= starThresholds.twoStars) return 2;
    if (score >= starThresholds.oneStar) return 1;
    return 0;
  };

  const getAccuracyEmoji = () => {
    if (accuracy > 60) return '😊';
    if (accuracy >= 40) return '😐';
    return '😢';
  };

  const getMessage = () => {
    const stars = getStarCount();
    if (stars === 3) return "AMAZING! You're an AI Master!";
    if (stars === 2) return "Great job! You're learning fast!";
    if (stars === 1) return "Good start! Keep practicing!";
    return "Don't give up! Try again!";
  };

  useEffect(() => {
    if (getStarCount() >= 2) {
      setShowConfetti(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <Confetti trigger={showConfetti} />

      {/* Title */}
      <div className="text-center animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-2">
          Game Over!
        </h1>
        <p className="text-xl text-muted-foreground font-semibold">
          {getMessage()}
        </p>
      </div>

      {/* Mascot */}
      <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <BrainMascot state={getStarCount() >= 2 ? 'happy' : 'sad'} size="lg" />
      </div>

      {/* Star Rating */}
      <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
        <StarRating score={score} />
      </div>

      {/* Stats */}
      <div 
        className="grid grid-cols-2 gap-6 animate-slide-up max-w-md w-full"
        style={{ animationDelay: '0.6s' }}
      >
        <div className="bg-card rounded-2xl p-6 text-center border border-border">
          <Trophy className="w-10 h-10 text-warning mx-auto mb-2" />
          <p className="text-3xl font-black text-primary">{score}</p>
          <p className="text-sm text-muted-foreground font-semibold">Points</p>
        </div>
        <div className="bg-card rounded-2xl p-6 text-center border border-border">
          <Target className="w-10 h-10 text-success mx-auto mb-2" />
          <p className="text-3xl font-black text-success">
            {matched}/{totalConcepts}
          </p>
          <p className="text-sm text-muted-foreground font-semibold">Matched</p>
        </div>
      </div>

      {/* Accuracy Bar with Emoji */}
      <div 
        className="w-full max-w-md animate-slide-up"
        style={{ animationDelay: '0.8s' }}
      >
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>Accuracy</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getAccuracyEmoji()}</span>
            <span className="font-bold text-foreground">{accuracy}%</span>
          </div>
        </div>
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      {/* Restart Button - Orange like Book Einstein CTA */}
      <Button
        onClick={onRestart}
        size="lg"
        className="animate-scale-in text-xl font-bold px-12 py-8 rounded-full 
                   bg-accent hover:bg-accent/90 hover:scale-110 
                   transition-all duration-300 text-accent-foreground shadow-lg"
        style={{ animationDelay: '1s' }}
      >
        <RotateCcw className="w-8 h-8 mr-2" />
        PLAY AGAIN
        <Sparkles className="w-8 h-8 ml-2" />
      </Button>

      {/* Encouragement */}
      <p 
        className="text-center text-muted-foreground text-sm animate-slide-up max-w-md"
        style={{ animationDelay: '1.2s' }}
      >
        {getStarCount() < 3 ? (
          <>🎯 <strong>Goal:</strong> Score {GAME_CONFIG.starThresholds.threeStars}+ points for 3 stars!</>
        ) : (
          <>🏆 <strong>Perfect!</strong> You've mastered all AI concepts!</>
        )}
      </p>

      {/* Link to Apply Game */}
      <Link 
        to="/apply"
        className="animate-slide-up flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
        style={{ animationDelay: '1.4s' }}
      >
        <Lightbulb className="w-4 h-4" />
        Ready to apply what you learned? Try Synapse Apply
      </Link>
    </div>
  );
};
