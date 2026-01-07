import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TrainingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    "The sky is blue...",
    "Dogs are loyal pets...",
    "Water is essential...",
    "Music brings joy...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => {
            setProgress(0);
            setCurrentExample(0);
          }, 2000);
          return 100;
        }
        return prev + 2;
      });
      setCurrentExample(prev => (prev + 1) % examples.length);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const books = ["📚", "📖", "📰", "📑", "📄"];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Books feeding into brain */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          {books.map((book, i) => (
            <motion.span
              key={i}
              animate={{ 
                x: [0, 30, 60],
                opacity: [1, 0.5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.3 
              }}
              className="text-2xl"
            >
              {book}
            </motion.span>
          ))}
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-6xl relative"
        >
          🤖
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 text-xl"
          >
            ⚡
          </motion.div>
        </motion.div>
      </div>

      {/* Current example being learned */}
      <div className="bg-card rounded-xl p-4 shadow-lg border border-border w-full max-w-sm">
        <p className="text-xs text-muted-foreground mb-2">Currently learning:</p>
        <motion.p
          key={currentExample}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-foreground font-medium"
        >
          {examples[currentExample]}
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Training Progress</span>
          <span className="text-primary font-medium">{progress}%</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-success"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-center">
        <div className="bg-secondary/50 rounded-lg px-4 py-2">
          <p className="text-2xl font-bold text-secondary-foreground">
            {Math.floor(progress * 10)}B
          </p>
          <p className="text-xs text-muted-foreground">Examples Seen</p>
        </div>
        <div className="bg-secondary/50 rounded-lg px-4 py-2">
          <p className="text-2xl font-bold text-secondary-foreground">
            {Math.floor(progress / 10)}M
          </p>
          <p className="text-xs text-muted-foreground">Patterns Learned</p>
        </div>
      </div>

      {/* Completion message */}
      {progress >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-success/20 text-success rounded-lg px-4 py-2"
        >
          ✨ Training Complete! AI is ready!
        </motion.div>
      )}
    </div>
  );
};
