import { GAME_CONFIG } from './GameData';

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  const isUrgent = timeLeft <= GAME_CONFIG.urgentTimeThreshold;
  const percentage = (timeLeft / GAME_CONFIG.totalTime) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`text-4xl font-black ${isUrgent ? 'timer-urgent' : 'text-primary'}`}>
        {timeLeft}s
      </div>
      <div className="w-32 h-3 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isUrgent ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
