import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const SoftmaxAnimation = () => {
  const [step, setStep] = useState<'logits' | 'converting' | 'probabilities'>('logits');

  const data = [
    { word: "happy", logit: 2.1, probability: 45 },
    { word: "excited", logit: 1.8, probability: 33 },
    { word: "joyful", logit: 1.2, probability: 18 },
    { word: "sad", logit: -0.5, probability: 4 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => {
        if (prev === 'logits') return 'converting';
        if (prev === 'converting') return 'probabilities';
        return 'logits';
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Step indicator */}
      <div className="flex gap-2">
        {['logits', 'converting', 'probabilities'].map((s) => (
          <div
            key={s}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              step === s 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {s === 'logits' && '1. Raw Scores'}
            {s === 'converting' && '2. Softmax Magic'}
            {s === 'probabilities' && '3. Probabilities'}
          </div>
        ))}
      </div>

      {/* Visualization */}
      <div className="w-full max-w-md">
        {step === 'logits' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <p className="text-sm text-muted-foreground text-center mb-4">
              Raw logit scores (hard to compare):
            </p>
            {data.map((item, i) => (
              <motion.div
                key={item.word}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-muted/30 rounded-lg p-2"
              >
                <span className="w-16 font-medium">{item.word}</span>
                <span className={`font-mono ${item.logit > 0 ? 'text-success' : 'text-destructive'}`}>
                  {item.logit > 0 ? '+' : ''}{item.logit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {step === 'converting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl"
            >
              📈
            </motion.div>
            <p className="text-lg font-medium text-primary">Softmax Function</p>
            <p className="text-sm text-muted-foreground text-center">
              Converting scores to percentages...
            </p>
            <code className="bg-card px-3 py-1 rounded text-xs font-mono">
              e^score / Σ(e^scores)
            </code>
          </motion.div>
        )}

        {step === 'probabilities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <p className="text-sm text-muted-foreground text-center mb-4">
              Probabilities (easy to understand!):
            </p>
            {data.map((item, i) => (
              <motion.div
                key={item.word}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-muted/30 rounded-lg p-2"
              >
                <span className="w-16 font-medium">{item.word}</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.probability}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="font-bold text-primary w-12 text-right">
                  {item.probability}%
                </span>
              </motion.div>
            ))}
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-success font-medium mt-4"
            >
              ✓ Total = 100% (always!)
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
