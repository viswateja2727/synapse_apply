import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const EmbeddingAnimation = () => {
  const [step, setStep] = useState(0);
  
  const words = [
    { word: "King", numbers: [0.8, 0.2, 0.9] },
    { word: "Queen", numbers: [0.7, 0.3, 0.9] },
    { word: "Apple", numbers: [0.1, 0.9, 0.2] },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Words to numbers visualization */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {words.map((item, index) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= index ? 1 : 0.3, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-4"
          >
            {/* Word */}
            <div className="bg-card rounded-lg px-4 py-2 shadow-md border border-border min-w-[80px] text-center">
              <span className="text-xl font-semibold text-foreground">{item.word}</span>
            </div>

            {/* Arrow */}
            <motion.span
              animate={{ x: step >= index ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-xl text-primary"
            >
              →
            </motion.span>

            {/* Numbers */}
            <div className="flex gap-1">
              {item.numbers.map((num, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: step >= index ? 1 : 0 }}
                  transition={{ delay: index * 0.2 + i * 0.1 }}
                  className="bg-primary/20 border border-primary/40 rounded px-2 py-1"
                >
                  <span className="font-mono text-sm text-primary">{num}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Similarity explanation */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success/10 border border-success/30 rounded-xl p-4 text-center"
        >
          <p className="text-sm text-success font-medium">
            📊 Similar words have similar numbers!
          </p>
          <p className="text-xs text-success/80 mt-1">
            "King" and "Queen" are close • "Apple" is different
          </p>
        </motion.div>
      )}

      {/* Vector space visualization */}
      <div className="relative w-48 h-48 bg-card rounded-xl border border-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Vector Space</span>
        </div>
        {words.map((item, i) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: step >= i ? 1 : 0,
              x: item.numbers[0] * 100 + 20,
              y: item.numbers[1] * 100 + 20
            }}
            className="absolute"
          >
            <div className={`w-3 h-3 rounded-full ${
              i === 2 ? 'bg-warning' : 'bg-primary'
            }`} />
            <span className="text-xs font-medium ml-1">{item.word}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
