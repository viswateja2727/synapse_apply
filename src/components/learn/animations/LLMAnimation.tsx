import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LLMAnimation = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const sentence = ["The", "cat", "sat", "on", "the", "___"];
  const predictions = ["mat", "roof", "chair", "floor"];
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentWord < sentence.length - 1) {
        setCurrentWord(prev => prev + 1);
      } else {
        setShowPredictions(true);
        setTimeout(() => {
          setCurrentWord(0);
          setShowPredictions(false);
        }, 3000);
      }
    }, 800);
    return () => clearInterval(timer);
  }, [currentWord]);

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Brain with books */}
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          🧠
        </motion.div>
        <div className="text-muted-foreground">+</div>
        <div className="flex gap-1">
          {["📚", "📖", "📰"].map((book, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-3xl"
            >
              {book}
            </motion.span>
          ))}
        </div>
        <div className="text-muted-foreground">=</div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-5xl"
        >
          🤖
        </motion.div>
      </div>

      {/* Sentence building */}
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <p className="text-sm text-muted-foreground mb-3 text-center">Predicting the next word:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {sentence.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index <= currentWord ? 1 : 0.2,
                y: index <= currentWord ? 0 : 20
              }}
              className={`text-xl font-medium px-3 py-1 rounded ${
                index === sentence.length - 1 
                  ? 'bg-warning/20 text-warning border-2 border-dashed border-warning' 
                  : 'text-foreground'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Predictions */}
      {showPredictions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-sm text-muted-foreground">LLM predicts:</p>
          <div className="flex gap-2">
            {predictions.map((pred, i) => (
              <motion.div
                key={pred}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  i === 0 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {pred} {i === 0 ? '✓' : ''}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
