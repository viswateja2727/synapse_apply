import { useState } from 'react';

interface AnswerCardProps {
  definition: string;
  emoji: string;
  onClick: () => void;
  disabled: boolean;
  isCorrect?: boolean | null;
  delay?: number;
  cardIndex?: number;
}

export const AnswerCard = ({
  definition,
  emoji,
  onClick,
  disabled,
  isCorrect,
  delay = 0,
  cardIndex = 0,
}: AnswerCardProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 500);
  };

  const getStateClass = () => {
    if (isCorrect === true) return 'correct';
    if (isCorrect === false && clicked) return 'wrong';
    return '';
  };

  const getCardColorClass = () => {
    const colors = ['game-card-1', 'game-card-2', 'game-card-3', 'game-card-4'];
    return colors[cardIndex % 4];
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`game-card ${getCardColorClass()} w-full text-left animate-scale-in ${getStateClass()}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0 drop-shadow-sm">{emoji}</span>
        <p className="text-lg font-bold text-foreground leading-snug tracking-tight">
          {definition}
        </p>
      </div>
    </button>
  );
};
