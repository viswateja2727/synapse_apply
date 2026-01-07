import { useState, useCallback, useMemo } from "react";
import { SCENARIOS, CONCEPT_OPTIONS, APPLY_GAME_CONFIG, ScenarioItem } from "../ApplyGameData";
import { soundManager } from "../SoundManager";
import { Lightbulb, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplyGameScreenProps {
  onGameOver: (score: number, correct: number, total: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ApplyGameScreen = ({ onGameOver }: ApplyGameScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  // Shuffle scenarios once on mount
  const gameScenarios = useMemo(() => {
    return shuffleArray(SCENARIOS).slice(0, APPLY_GAME_CONFIG.questionsPerGame);
  }, []);

  const currentScenario: ScenarioItem | undefined = gameScenarios[currentIndex];

  // Shuffle concept options for each question
  const shuffledOptions = useMemo(() => {
    return shuffleArray(CONCEPT_OPTIONS);
  }, [currentIndex]);

  const handleSelectAnswer = useCallback((conceptId: number) => {
    if (showFeedback) return;

    setSelectedAnswer(conceptId);
    setShowFeedback(true);

    const isCorrect = conceptId === currentScenario?.correctConceptId;

    if (isCorrect) {
      soundManager.playCorrect();
      const pointsEarned = APPLY_GAME_CONFIG.correctPoints + (hintUsed ? APPLY_GAME_CONFIG.hintPenalty : 0);
      setScore(prev => prev + pointsEarned);
      setCorrectCount(prev => prev + 1);
    } else {
      soundManager.playWrong();
      setScore(prev => Math.max(0, prev + APPLY_GAME_CONFIG.wrongPenalty));
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentIndex + 1 >= gameScenarios.length) {
        const finalScore = isCorrect 
          ? score + APPLY_GAME_CONFIG.correctPoints + (hintUsed ? APPLY_GAME_CONFIG.hintPenalty : 0)
          : Math.max(0, score + APPLY_GAME_CONFIG.wrongPenalty);
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        onGameOver(finalScore, finalCorrect, gameScenarios.length);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowHint(false);
        setHintUsed(false);
      }
    }, 1500);
  }, [showFeedback, currentScenario, hintUsed, currentIndex, gameScenarios.length, score, correctCount, onGameOver]);

  const handleShowHint = useCallback(() => {
    if (!hintUsed) {
      setShowHint(true);
      setHintUsed(true);
    }
  }, [hintUsed]);

  if (!currentScenario) return null;

  const correctConcept = CONCEPT_OPTIONS.find(c => c.id === currentScenario.correctConceptId);

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/50">
            <span className="text-sm font-medium text-muted-foreground">Question</span>
            <span className="ml-2 text-lg font-bold text-primary">
              {currentIndex + 1}/{gameScenarios.length}
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-full px-5 py-2 shadow-md border border-white/50">
          <span className="text-sm font-medium text-muted-foreground">Score</span>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {score}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {/* Scenario Card */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
              REAL-WORLD SCENARIO
            </span>
          </div>
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
            "{currentScenario.scenario}"
          </p>
          
          {/* Hint Section */}
          {currentScenario.hint && (
            <div className="mt-4 pt-4 border-t border-primary/10">
              {showHint ? (
                <div className="flex items-center gap-2 text-primary/80">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm italic">{currentScenario.hint}</span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShowHint}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Show Hint (-15 pts)
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
          Which AI concept does this describe?
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
          {shuffledOptions.map((option, index) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.id === currentScenario.correctConceptId;
            const showAsCorrect = showFeedback && isCorrect;
            const showAsWrong = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={showFeedback}
                className={cn(
                  "relative p-4 rounded-2xl transition-all duration-300 border-2 text-left group",
                  "hover:scale-[1.02] hover:shadow-lg",
                  !showFeedback && !isSelected && [
                    index % 4 === 0 && "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:border-sky-400",
                    index % 4 === 1 && "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:border-indigo-400",
                    index % 4 === 2 && "bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200 hover:border-violet-400",
                    index % 4 === 3 && "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:border-cyan-400",
                  ],
                  showAsCorrect && "bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-500 shadow-lg shadow-emerald-200/50",
                  showAsWrong && "bg-gradient-to-br from-rose-100 to-rose-200 border-rose-500 shadow-lg shadow-rose-200/50",
                  showFeedback && !showAsCorrect && !showAsWrong && "opacity-50"
                )}
              >
                {/* Feedback Icon */}
                {showAsCorrect && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                {showAsWrong && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                    <X className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="text-2xl mb-2">{option.emoji}</div>
                <div className="font-bold text-foreground text-sm md:text-base">
                  {option.concept}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={cn(
            "mt-6 text-center p-4 rounded-xl animate-fade-in",
            selectedAnswer === currentScenario.correctConceptId
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-100 text-rose-800"
          )}>
            {selectedAnswer === currentScenario.correctConceptId ? (
              <p className="font-bold">✓ Correct! Great understanding!</p>
            ) : (
              <p className="font-bold">
                ✗ Not quite. The answer is <span className="underline">{correctConcept?.concept}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
