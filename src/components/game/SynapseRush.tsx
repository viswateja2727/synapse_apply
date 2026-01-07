import { useState, useCallback } from 'react';
import { StartScreen } from './StartScreen';
import { GameScreen } from './GameScreen';
import { EndScreen } from './EndScreen';
import { SoundToggle } from './SoundToggle';

type GameState = 'start' | 'playing' | 'end';

// Decorative shapes instead of emojis
const DECORATIVE_SHAPES = [
  { type: 'circle', color: 'bg-primary/20', size: 'w-8 h-8' },
  { type: 'circle', color: 'bg-secondary/25', size: 'w-12 h-12' },
  { type: 'circle', color: 'bg-accent/15', size: 'w-6 h-6' },
  { type: 'square', color: 'bg-primary/15', size: 'w-10 h-10', rotate: 'rotate-45' },
  { type: 'circle', color: 'bg-warning/20', size: 'w-14 h-14' },
  { type: 'square', color: 'bg-secondary/20', size: 'w-8 h-8', rotate: 'rotate-12' },
  { type: 'circle', color: 'bg-success/15', size: 'w-10 h-10' },
  { type: 'circle', color: 'bg-primary/25', size: 'w-16 h-16' },
  { type: 'square', color: 'bg-accent/20', size: 'w-6 h-6', rotate: 'rotate-45' },
  { type: 'circle', color: 'bg-secondary/15', size: 'w-9 h-9' },
  { type: 'circle', color: 'bg-warning/25', size: 'w-7 h-7' },
  { type: 'square', color: 'bg-primary/20', size: 'w-11 h-11', rotate: 'rotate-30' },
];

export const SynapseRush = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [finalScore, setFinalScore] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  const handleStart = useCallback(() => {
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((score: number, matched: number) => {
    setFinalScore(score);
    setMatchedCount(matched);
    setGameState('end');
  }, []);

  const handleRestart = useCallback(() => {
    setFinalScore(0);
    setMatchedCount(0);
    setGameState('start');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative background with shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-[400px] h-[400px] bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl" />
        
        {/* Floating decorative shapes */}
        {DECORATIVE_SHAPES.map((shape, index) => (
          <div
            key={index}
            className={`absolute ${shape.size} ${shape.color} ${shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'} ${shape.rotate || ''} floating backdrop-blur-sm`}
            style={{
              left: `${(index * 8) + 2}%`,
              top: `${(index % 6) * 16 + 5}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${5 + (index % 4)}s`,
            }}
          />
        ))}
        
        {/* Decorative curved lines */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-32 text-primary/15"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
        <svg 
          className="absolute bottom-0 left-0 w-full h-20 text-secondary/10"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,50 C360,100 720,20 1080,70 C1260,90 1380,40 1440,50 L1440,100 L0,100 Z"
          />
        </svg>

        {/* Additional decorative dots pattern */}
        <div className="absolute top-10 right-20 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-20 right-32 w-3 h-3 bg-secondary/25 rounded-full" />
        <div className="absolute top-32 right-16 w-2 h-2 bg-accent/35 rounded-full" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/25 rounded-full" />
        <div className="absolute bottom-28 left-32 w-2 h-2 bg-warning/30 rounded-full" />
      </div>

      <SoundToggle />

      <div className="relative z-10">
        {gameState === 'start' && <StartScreen onStart={handleStart} />}
        {gameState === 'playing' && <GameScreen onGameOver={handleGameOver} />}
        {gameState === 'end' && (
          <EndScreen
            score={finalScore}
            matched={matchedCount}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};
