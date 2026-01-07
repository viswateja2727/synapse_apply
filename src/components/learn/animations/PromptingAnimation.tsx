import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PromptingAnimation = () => {
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    {
      bad: "Help me",
      good: "Explain photosynthesis to a 5-year-old using a fun story",
      response: "🌱 Once upon a time, a little plant named Sunny...",
    },
    {
      bad: "Write code",
      good: "Write a Python function that calculates the factorial of a number with comments",
      response: "def factorial(n):\n  # Base case: 0! = 1...",
    },
    {
      bad: "Tell me about dogs",
      good: "Compare 3 dog breeds for apartment living, focusing on size and energy level",
      response: "🐕 1. French Bulldog: Small, low energy...",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExample(prev => (prev + 1) % examples.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const example = examples[currentExample];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <span className="text-3xl">✨</span>
        <span className="font-semibold text-foreground">The Art of Prompting</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentExample}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-md space-y-4"
        >
          {/* Bad prompt */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-destructive">❌</span>
              <span className="text-sm font-medium text-destructive">Vague Prompt:</span>
            </div>
            <p className="text-foreground font-mono text-sm bg-card/50 rounded px-2 py-1">
              "{example.bad}"
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-center text-2xl"
          >
            ⬇️
          </motion.div>

          {/* Good prompt */}
          <div className="bg-success/10 border border-success/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-success">✓</span>
              <span className="text-sm font-medium text-success">Clear Prompt:</span>
            </div>
            <p className="text-foreground font-mono text-sm bg-card/50 rounded px-2 py-1">
              "{example.good}"
            </p>
          </div>

          {/* Response preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-primary/10 border border-primary/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary">🤖</span>
              <span className="text-sm font-medium text-primary">AI Response:</span>
            </div>
            <p className="text-foreground text-sm opacity-90">
              {example.response}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Tips */}
      <div className="flex gap-2 flex-wrap justify-center">
        {["Be specific", "Give context", "Set format"].map((tip, i) => (
          <motion.span
            key={tip}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-xs"
          >
            💡 {tip}
          </motion.span>
        ))}
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
