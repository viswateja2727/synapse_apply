import { Flame } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  streak: number;
}

export const ScoreDisplay = ({ score, streak }: ScoreDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl font-bold text-foreground">
        Score: <span className="text-primary neon-text">{score}</span>
      </div>
      {streak >= 2 && (
        <div className="streak-badge">
          <Flame className="w-4 h-4" />
          <span>{streak}x Streak!</span>
        </div>
      )}
    </div>
  );
};
