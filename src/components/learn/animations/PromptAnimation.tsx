import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const PromptAnimation = () => {
  const [typedText, setTypedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const promptText = "Write a poem about rainbows 🌈";

  useEffect(() => {
    let index = 0;
    setTypedText('');
    setShowResponse(false);

    const typingTimer = setInterval(() => {
      if (index < promptText.length) {
        setTypedText(promptText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
        setTimeout(() => setShowResponse(true), 500);
        setTimeout(() => {
          setTypedText('');
          setShowResponse(false);
        }, 4000);
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, []);

  // Restart animation periodically
  useEffect(() => {
    const restartTimer = setInterval(() => {
      setTypedText('');
      setShowResponse(false);
    }, 6000);
    return () => clearInterval(restartTimer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* User typing */}
      <div className="w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-2">You type your prompt:</p>
        <div className="bg-card rounded-xl p-4 shadow-lg border-2 border-primary/30 min-h-[60px]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <span className="text-lg text-foreground">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-primary ml-1"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-3xl text-primary"
      >
        ⬇️
      </motion.div>

      {/* AI processing */}
      <div className="w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-2">AI receives your instruction:</p>
        <motion.div 
          className="bg-secondary/50 rounded-xl p-4 border border-secondary"
          animate={showResponse ? {} : { scale: [1, 1.02, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {showResponse ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2"
            >
              <span className="text-2xl">🤖</span>
              <div className="text-sm text-secondary-foreground">
                <p className="font-medium mb-1">Rainbow's Arc</p>
                <p className="italic text-xs opacity-80">
                  Colors dance across the sky,<br/>
                  Red and orange flying high...
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-xl"
              >
                ⚙️
              </motion.span>
              <span className="text-muted-foreground text-sm">Processing prompt...</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
