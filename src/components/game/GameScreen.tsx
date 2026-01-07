import { useState, useEffect, useCallback } from 'react';
import { AI_CONCEPTS, GAME_CONFIG, type ConceptPair } from './GameData';
import { Timer } from './Timer';
import { ScoreDisplay } from './ScoreDisplay';
import { AnswerCard } from './AnswerCard';
import { BrainMascot } from './BrainMascot';
import { Confetti } from './Confetti';
import { soundManager } from './SoundManager';

interface GameScreenProps {
  onGameOver: (score: number, matched: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const GameScreen = ({ onGameOver }: GameScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.totalTime);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0);
  const [concepts, setConcepts] = useState<ConceptPair[]>([]);
  const [options, setOptions] = useState<ConceptPair[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mascotState, setMascotState] = useState<'idle' | 'happy' | 'sad' | 'thinking'>('thinking');
  const [showConfetti, setShowConfetti] = useState(false);
  const [matched, setMatched] = useState(0);

  // Initialize game
  useEffect(() => {
    const shuffled = shuffleArray(AI_CONCEPTS);
    setConcepts(shuffled);
    soundManager.playStart();
  }, []);

  // Generate options for current concept
  useEffect(() => {
    if (concepts.length === 0 || currentConceptIndex >= concepts.length) return;

    const currentConcept = concepts[currentConceptIndex];
    const otherConcepts = concepts.filter(c => c.id !== currentConcept.id);
    const wrongOptions = shuffleArray(otherConcepts).slice(0, 3);
    const allOptions = shuffleArray([currentConcept, ...wrongOptions]);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setMascotState('thinking');
  }, [currentConceptIndex, concepts]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver(score, matched);
      soundManager.playGameOver();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= GAME_CONFIG.urgentTimeThreshold && prev > 1) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, matched, onGameOver]);

  const handleAnswer = useCallback((selectedOption: ConceptPair) => {
    if (selectedAnswer !== null) return;

    const currentConcept = concepts[currentConceptIndex];
    const correct = selectedOption.id === currentConcept.id;

    setSelectedAnswer(selectedOption.id);
    setIsCorrect(correct);

    if (correct) {
      const newStreak = streak + 1;
      const streakBonus = Math.floor(GAME_CONFIG.baseScore * (1 + (newStreak - 1) * GAME_CONFIG.streakMultiplierBase));
      const timeBonus = Math.floor(timeLeft * 2);
      const totalPoints = streakBonus + timeBonus;

      setScore(prev => prev + totalPoints);
      setStreak(newStreak);
      setMatched(prev => prev + 1);
      setMascotState('happy');

      if (newStreak >= 3) {
        soundManager.playStreak();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      } else {
        soundManager.playCorrect();
      }
    } else {
      setScore(prev => Math.max(0, prev - GAME_CONFIG.wrongAnswerPenalty));
      setTimeLeft(prev => Math.max(0, prev - GAME_CONFIG.timePenalty));
      setStreak(0);
      setMascotState('sad');
      soundManager.playWrong();
    }

    // Move to next concept
    setTimeout(() => {
      if (currentConceptIndex + 1 >= concepts.length) {
        onGameOver(score + (correct ? GAME_CONFIG.baseScore : 0), matched + (correct ? 1 : 0));
        soundManager.playGameOver();
      } else {
        setCurrentConceptIndex(prev => prev + 1);
      }
    }, 800);
  }, [selectedAnswer, concepts, currentConceptIndex, streak, timeLeft, score, matched, onGameOver]);

  if (concepts.length === 0) return null;

  const currentConcept = concepts[currentConceptIndex];

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6">
      <Confetti trigger={showConfetti} />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <ScoreDisplay score={score} streak={streak} />
        <div className="flex items-center gap-4">
          <BrainMascot state={mascotState} size="sm" />
          <Timer timeLeft={timeLeft} />
        </div>
        <div className="text-muted-foreground font-semibold">
          {currentConceptIndex + 1} / {concepts.length}
        </div>
      </div>

      {/* Current Concept */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-center animate-scale-in" key={currentConceptIndex}>
          <p className="text-lg text-muted-foreground mb-3 font-medium">What is...</p>
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-sm">
            {currentConcept.concept}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
          {options.map((option, index) => (
            <AnswerCard
              key={`${currentConceptIndex}-${option.id}`}
              definition={option.definition}
              emoji={option.emoji}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              isCorrect={selectedAnswer === option.id ? isCorrect : null}
              delay={index * 100}
              cardIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
