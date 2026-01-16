import { useState, useCallback, useMemo, useEffect } from "react";
import { SCENARIOS, CONCEPT_OPTIONS, APPLY_GAME_CONFIG, ScenarioItem } from "../ApplyGameData";
import { soundManager } from "../SoundManager";
import { Lightbulb, Check, X, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

// Get 4 options: correct answer + 3 random distractors
const getOptionsForScenario = (correctConceptId: number): typeof CONCEPT_OPTIONS => {
  const correctOption = CONCEPT_OPTIONS.find(c => c.id === correctConceptId)!;
  const distractors = shuffleArray(
    CONCEPT_OPTIONS.filter(c => c.id !== correctConceptId)
  ).slice(0, APPLY_GAME_CONFIG.optionsPerQuestion - 1);
  
  return shuffleArray([correctOption, ...distractors]);
};

export const ApplyGameScreen = ({ onGameOver }: ApplyGameScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Shuffle scenarios once on mount
  const gameScenarios = useMemo(() => {
    return shuffleArray(SCENARIOS).slice(0, APPLY_GAME_CONFIG.questionsPerGame);
  }, []);

  const currentScenario: ScenarioItem | undefined = gameScenarios[currentIndex];

  // Get 4 options for current question (correct + 3 distractors)
  const questionOptions = useMemo(() => {
    if (!currentScenario) return [];
    return getOptionsForScenario(currentScenario.correctConceptId);
  }, [currentScenario]);

  const correctConcept = CONCEPT_OPTIONS.find(c => c.id === currentScenario?.correctConceptId);

  // Countdown timer for definition display
  useEffect(() => {
    if (showDefinition && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showDefinition, countdown]);

  const handleSelectAnswer = useCallback((conceptId: number) => {
    if (showFeedback) return;

    setSelectedAnswer(conceptId);
    setShowFeedback(true);

    const isCorrect = conceptId === currentScenario?.correctConceptId;

    if (isCorrect) {
      soundManager.playCorrect();
      setScore(prev => prev + APPLY_GAME_CONFIG.correctPoints);
      setCorrectCount(prev => prev + 1);
    } else {
      soundManager.playWrong();
      setScore(prev => Math.max(0, prev + APPLY_GAME_CONFIG.wrongPenalty));
    }

    // Show definition after brief feedback
    setTimeout(() => {
      setShowDefinition(true);
      setCountdown(5);
    }, 800);
  }, [showFeedback, currentScenario]);

  const handleContinue = useCallback(() => {
    const isCorrect = selectedAnswer === currentScenario?.correctConceptId;
    
    if (currentIndex + 1 >= gameScenarios.length) {
      const finalScore = isCorrect 
        ? score
        : score;
      const finalCorrect = correctCount;
      onGameOver(finalScore, finalCorrect, gameScenarios.length);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
      setHintUsed(false);
      setShowDefinition(false);
      setCountdown(5);
    }
  }, [selectedAnswer, currentScenario, currentIndex, gameScenarios.length, score, correctCount, onGameOver]);

  const handleShowHint = useCallback(() => {
    if (!hintUsed) {
      setShowHint(true);
      setHintUsed(true);
      // Immediately deduct hint penalty from score
      setScore(prev => Math.max(0, prev - APPLY_GAME_CONFIG.hintPenalty));
    }
  }, [hintUsed]);

  if (!currentScenario) return null;

  const progress = ((currentIndex) / gameScenarios.length) * 100;
  const isAnswerCorrect = selectedAnswer === currentScenario.correctConceptId;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 max-w-5xl mx-auto">
      {/* Header with Progress */}
      <div className="mb-4">
        {/* Progress Bar */}
        <div className="relative h-2 bg-white/40 rounded-full overflow-hidden mb-4 backdrop-blur-sm">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/60">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Question</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-primary">{currentIndex + 1}</span>
                <span className="text-sm text-muted-foreground font-medium">/ {gameScenarios.length}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm rounded-2xl px-5 py-2 shadow-lg border border-white/60"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={score}
          >
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Score</span>
            <motion.div 
              className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {score}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!showDefinition ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              {/* Scenario Card */}
              <motion.div 
                className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/60 mb-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Real-World Scenario
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
                </div>
                
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  <span className="text-3xl text-primary/60 font-serif">"</span>
                  {currentScenario.scenario}
                  <span className="text-3xl text-primary/60 font-serif">"</span>
                </p>
                
                {/* Hint Section */}
                {currentScenario.hint && (
                  <div className="mt-4 pt-4 border-t border-primary/10">
                    <AnimatePresence mode="wait">
                      {showHint ? (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="flex items-start gap-2 bg-warning/10 rounded-xl p-3"
                        >
                          <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80 italic">{currentScenario.hint}</span>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShowHint}
                            disabled={showFeedback}
                            className="text-muted-foreground hover:text-warning hover:bg-warning/10 transition-colors"
                          >
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Need a hint? <span className="ml-1 text-destructive/70">(-15 pts)</span>
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>

              {/* Question */}
              <motion.h2 
                className="text-xl font-bold text-foreground mb-5 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Which AI concept does this describe?
              </motion.h2>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {questionOptions.map((option, index) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrect = option.id === currentScenario.correctConceptId;
                  const showAsCorrect = showFeedback && isCorrect;
                  const showAsWrong = showFeedback && isSelected && !isCorrect;

                  const cardColors = [
                    "from-sky-50 to-sky-100/80 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50",
                    "from-violet-50 to-violet-100/80 border-violet-200 hover:border-violet-400 hover:shadow-violet-200/50",
                    "from-emerald-50 to-emerald-100/80 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-200/50",
                    "from-rose-50 to-rose-100/80 border-rose-200 hover:border-rose-400 hover:shadow-rose-200/50",
                  ];

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelectAnswer(option.id)}
                      disabled={showFeedback}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={!showFeedback ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                      className={cn(
                        "relative p-5 rounded-2xl transition-all duration-300 border-2 text-left group overflow-hidden",
                        !showFeedback && `bg-gradient-to-br ${cardColors[index % 4]}`,
                        !showFeedback && "hover:shadow-xl",
                        showAsCorrect && "bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-500 shadow-xl shadow-emerald-200/50",
                        showAsWrong && "bg-gradient-to-br from-rose-100 to-rose-200 border-rose-500 shadow-xl shadow-rose-200/50",
                        showFeedback && !showAsCorrect && !showAsWrong && "opacity-40 grayscale"
                      )}
                    >
                      {/* Shimmer effect */}
                      {!showFeedback && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      )}

                      {/* Feedback Icon */}
                      <AnimatePresence>
                        {showAsCorrect && (
                          <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                        {showAsWrong && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <X className="w-5 h-5 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative z-10">
                        <span className="text-3xl mb-2 block drop-shadow-sm">{option.emoji}</span>
                        <span className="font-bold text-foreground text-base block leading-tight">
                          {option.concept}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Definition Display */
            <motion.div
              key="definition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl mx-auto"
            >
              <motion.div 
                className={cn(
                  "rounded-3xl p-8 shadow-2xl border-2 text-center",
                  isAnswerCorrect 
                    ? "bg-gradient-to-br from-emerald-50 via-emerald-100/80 to-teal-50 border-emerald-300"
                    : "bg-gradient-to-br from-rose-50 via-rose-100/80 to-orange-50 border-rose-300"
                )}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                {/* Result Badge */}
                <motion.div 
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
                    isAnswerCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  {isAnswerCorrect ? (
                    <>
                      <Check className="w-5 h-5" strokeWidth={3} />
                      <span className="font-bold">Correct!</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" strokeWidth={3} />
                      <span className="font-bold">Not Quite</span>
                    </>
                  )}
                </motion.div>

                {/* Concept with Emoji */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-5xl mb-3 block">{correctConcept?.emoji}</span>
                  <h3 className="text-2xl font-black text-foreground">{correctConcept?.concept}</h3>
                </motion.div>

                {/* Definition */}
                <motion.div 
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-3 text-primary">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wide">Definition</span>
                  </div>
                  <p className="text-foreground/90 text-lg leading-relaxed font-medium">
                    {correctConcept?.definition}
                  </p>
                </motion.div>

                {/* Continue Button with Countdown */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleContinue}
                    size="lg"
                    className={cn(
                      "font-bold text-lg px-8 py-6 rounded-full shadow-xl transition-all duration-300 group",
                      countdown > 0 
                        ? "bg-muted text-muted-foreground cursor-wait"
                        : "bg-accent hover:bg-accent/90 text-white hover:shadow-2xl hover:scale-105"
                    )}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? (
                      <span className="flex items-center gap-2">
                        Continue in {countdown}s
                        <span className="inline-block w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {currentIndex + 1 >= gameScenarios.length ? "See Results" : "Next Question"}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};