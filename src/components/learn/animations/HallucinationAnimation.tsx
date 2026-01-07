import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HallucinationAnimation = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);

  const examples = [
    {
      question: "Where is the Eiffel Tower?",
      wrong: "The Eiffel Tower is located in London, England! 🇬🇧",
      correct: "Actually, it's in Paris, France! 🇫🇷",
      confidence: 95,
    },
    {
      question: "Who wrote Harry Potter?",
      wrong: "Harry Potter was written by Stephen King in 1985!",
      correct: "It was written by J.K. Rowling, starting in 1997!",
      confidence: 88,
    },
    {
      question: "How many legs does a spider have?",
      wrong: "Spiders have 6 legs, just like all insects! 🕷️",
      correct: "Spiders have 8 legs - they're not insects!",
      confidence: 92,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowCorrection(true), 2500);
    const nextTimer = setTimeout(() => {
      setShowCorrection(false);
      setCurrentExample(prev => (prev + 1) % examples.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(nextTimer);
    };
  }, [currentExample]);

  const example = examples[currentExample];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Warning icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-5xl"
      >
        👻
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentExample}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-md space-y-4"
        >
          {/* Question */}
          <div className="bg-card rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <span>🙋</span>
              <span className="text-sm font-medium text-muted-foreground">You asked:</span>
            </div>
            <p className="text-foreground font-medium">{example.question}</p>
          </div>

          {/* AI's wrong answer */}
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className={`rounded-lg p-3 border-2 ${
              showCorrection 
                ? 'bg-destructive/10 border-destructive/50' 
                : 'bg-primary/10 border-primary/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span className="text-sm font-medium">AI says:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <span className={`text-xs font-bold ${showCorrection ? 'text-destructive' : 'text-success'}`}>
                  {example.confidence}%
                </span>
              </div>
            </div>
            <p className="text-foreground">{example.wrong}</p>
            
            {showCorrection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-destructive/30"
              >
                <div className="flex items-center gap-2 text-destructive">
                  <span>❌</span>
                  <span className="text-sm font-bold">HALLUCINATION!</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Correction */}
          {showCorrection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-success/10 border border-success/50 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <span>✅</span>
                <span className="text-sm font-bold text-success">Actually correct:</span>
              </div>
              <p className="text-foreground">{example.correct}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Tips */}
      <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 max-w-sm">
        <p className="text-sm text-warning text-center">
          <strong>⚠️ Always verify!</strong>
          <br />
          <span className="text-xs">
            AI can sound confident even when wrong. Check important facts!
          </span>
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2">
        {examples.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentExample ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
