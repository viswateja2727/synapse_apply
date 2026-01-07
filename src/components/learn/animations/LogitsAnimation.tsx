import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LogitsAnimation = () => {
  const [showScores, setShowScores] = useState(false);
  const [highlightBest, setHighlightBest] = useState(false);

  const predictions = [
    { word: "happy", score: 2.1, color: "bg-success" },
    { word: "excited", score: 1.8, color: "bg-primary" },
    { word: "joyful", score: 1.2, color: "bg-secondary" },
    { word: "sad", score: -0.5, color: "bg-destructive" },
    { word: "angry", score: -1.2, color: "bg-destructive" },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowScores(true), 1000);
    const timer2 = setTimeout(() => setHighlightBest(true), 2500);
    const timer3 = setTimeout(() => {
      setShowScores(false);
      setHighlightBest(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Restart animation
  useEffect(() => {
    const restartTimer = setInterval(() => {
      setShowScores(false);
      setHighlightBest(false);
      setTimeout(() => setShowScores(true), 1000);
      setTimeout(() => setHighlightBest(true), 2500);
    }, 6000);
    return () => clearInterval(restartTimer);
  }, []);

  const maxScore = Math.max(...predictions.map(p => p.score));

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Input context */}
      <div className="bg-card rounded-lg px-4 py-2 shadow-md border border-border">
        <span className="text-sm text-muted-foreground">AI is thinking: </span>
        <span className="font-medium text-foreground">"I feel ___"</span>
      </div>

      {/* Logits visualization */}
      <div className="w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Raw scores (Logits) for each word:
        </p>
        
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <motion.div
              key={pred.word}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: showScores ? 1 : 0, x: showScores ? 0 : -20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                highlightBest && pred.score === maxScore 
                  ? 'bg-success/20 ring-2 ring-success' 
                  : 'bg-muted/30'
              }`}
            >
              {/* Word */}
              <span className="font-medium text-foreground w-20">{pred.word}</span>

              {/* Score bar */}
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showScores ? `${Math.max(0, (pred.score + 2) / 4 * 100)}%` : 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className={`h-full ${pred.color}`}
                />
              </div>

              {/* Score number */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: showScores ? 1 : 0 }}
                className={`font-mono text-sm w-12 text-right ${
                  pred.score > 0 ? 'text-success' : 'text-destructive'
                }`}
              >
                {pred.score > 0 ? '+' : ''}{pred.score}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {highlightBest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success/10 border border-success/30 rounded-xl p-4 text-center"
        >
          <p className="text-sm text-success font-medium">
            📊 "happy" has the highest logit score (2.1)
          </p>
          <p className="text-xs text-success/80 mt-1">
            Higher scores = more likely to be chosen
          </p>
        </motion.div>
      )}
    </div>
  );
};
