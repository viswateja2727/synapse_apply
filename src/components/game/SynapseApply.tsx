import { useState, useCallback } from 'react';
import { ApplyStartScreen } from './apply/ApplyStartScreen';
import { ApplyGameScreen } from './apply/ApplyGameScreen';
import { ApplyEndScreen } from './apply/ApplyEndScreen';
import { SoundToggle } from './SoundToggle';

type GameState = 'start' | 'playing' | 'end';

// Decorative shapes for background
const DECORATIVE_SHAPES = [
  { type: 'circle', color: 'bg-primary/15', size: 'w-10 h-10' },
  { type: 'circle', color: 'bg-secondary/20', size: 'w-14 h-14' },
  { type: 'circle', color: 'bg-accent/10', size: 'w-8 h-8' },
  { type: 'square', color: 'bg-primary/10', size: 'w-12 h-12', rotate: 'rotate-45' },
  { type: 'circle', color: 'bg-warning/15', size: 'w-16 h-16' },
  { type: 'square', color: 'bg-secondary/15', size: 'w-10 h-10', rotate: 'rotate-12' },
  { type: 'circle', color: 'bg-success/10', size: 'w-12 h-12' },
  { type: 'circle', color: 'bg-primary/20', size: 'w-18 h-18' },
  { type: 'square', color: 'bg-accent/15', size: 'w-8 h-8', rotate: 'rotate-45' },
  { type: 'circle', color: 'bg-secondary/10', size: 'w-11 h-11' },
];

export const SynapseApply = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [finalScore, setFinalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleStart = useCallback(() => {
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((score: number, correct: number, total: number) => {
    setFinalScore(score);
    setCorrectCount(correct);
    setTotalCount(total);
    setGameState('end');
  }, []);

  const handleRestart = useCallback(() => {
    setFinalScore(0);
    setCorrectCount(0);
    setTotalCount(0);
    setGameState('start');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-sky-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/30 to-violet-100/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/25 to-indigo-100/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
        
        {/* Floating shapes */}
        {DECORATIVE_SHAPES.map((shape, index) => (
          <div
            key={index}
            className={`absolute ${shape.size} ${shape.color} ${shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'} ${shape.rotate || ''} floating backdrop-blur-sm`}
            style={{
              left: `${(index * 9) + 3}%`,
              top: `${(index % 5) * 18 + 8}%`,
              animationDelay: `${index * 0.4}s`,
              animationDuration: `${6 + (index % 3)}s`,
            }}
          />
        ))}
        
        {/* Decorative wave */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-28 text-violet-200/30"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,80 C360,20 720,120 1080,60 C1260,30 1380,80 1440,70 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <SoundToggle />

      <div className="relative z-10">
        {gameState === 'start' && <ApplyStartScreen onStart={handleStart} />}
        {gameState === 'playing' && <ApplyGameScreen onGameOver={handleGameOver} />}
        {gameState === 'end' && (
          <ApplyEndScreen
            score={finalScore}
            correct={correctCount}
            total={totalCount}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};
