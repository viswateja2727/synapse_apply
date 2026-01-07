import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContextAnimation = () => {
  const [step, setStep] = useState(0);
  
  const conversation = [
    { role: 'user', text: "I love pizza 🍕" },
    { role: 'ai', text: "Pizza is delicious! What's your favorite topping?" },
    { role: 'user', text: "Tell me more about it" },
  ];

  const contextBubbles = ["pizza", "love", "topping", "favorite"];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 6);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Brain with memory */}
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <span className="text-5xl">🧠</span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 bg-primary rounded-full w-4 h-4 flex items-center justify-center"
          >
            <span className="text-xs text-primary-foreground font-bold">💭</span>
          </motion.div>
        </motion.div>
        <span className="text-muted-foreground text-sm">AI's Memory</span>
      </div>

      {/* Conversation */}
      <div className="bg-card rounded-xl p-4 shadow-lg border border-border w-full max-w-sm">
        <AnimatePresence>
          {conversation.map((msg, index) => (
            step >= index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Context explanation */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success/10 border border-success/30 rounded-xl p-4 text-center"
        >
          <p className="text-sm text-success font-medium mb-2">
            AI understands "it" refers to pizza! 🍕
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            {contextBubbles.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-success/20 text-success px-2 py-1 rounded text-xs"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
