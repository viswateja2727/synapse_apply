import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TokenAnimation = () => {
  const [step, setStep] = useState(0);
  const originalText = "Hello, how are you?";
  const tokens = ["Hello", ",", " how", " are", " you", "?"];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % (tokens.length + 2));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Original text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Original Text:</p>
        <div className="bg-card rounded-xl px-6 py-4 shadow-lg border border-border">
          <span className="text-2xl font-semibold text-foreground">{originalText}</span>
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-4xl text-primary"
      >
        ⬇️
      </motion.div>

      {/* Tokenized output */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Broken into Tokens:</p>
        <div className="flex flex-wrap gap-2 justify-center max-w-md">
          <AnimatePresence>
            {tokens.map((token, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ 
                  opacity: step > index ? 1 : 0.3,
                  scale: step > index ? 1 : 0.8,
                  y: 0
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`px-4 py-2 rounded-lg font-mono text-lg shadow-md border-2 ${
                  step > index 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-muted text-muted-foreground border-border'
                }`}
              >
                {token === " how" || token === " are" || token === " you" 
                  ? `"${token}"` 
                  : `"${token}"`}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Token count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-secondary/50 rounded-full px-4 py-2"
      >
        <span className="text-secondary-foreground font-medium">
          {Math.min(step, tokens.length)} / {tokens.length} tokens
        </span>
      </motion.div>
    </div>
  );
};
