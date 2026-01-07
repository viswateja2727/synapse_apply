import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ContextWindowAnimation = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const maxMessages = 5;

  const allMessages = [
    "Hi there!",
    "What's the weather?",
    "It's sunny today",
    "Tell me a joke",
    "Why did the chicken...",
    "That's funny!",
    "What's 2+2?",
    "The answer is 4",
    "Thanks!",
    "You're welcome!",
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setMessages(prev => {
        const newMessages = [...prev, allMessages[index % allMessages.length]];
        index++;
        // Keep only last maxMessages
        return newMessages.slice(-maxMessages);
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const forgottenCount = Math.max(0, messages.length - maxMessages + (messages.length >= maxMessages ? allMessages.indexOf(messages[0]) : 0));

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Window visualization */}
      <div className="relative w-full max-w-sm">
        {/* Window frame */}
        <div className="bg-card rounded-xl border-2 border-primary/50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary/20 px-4 py-2 border-b border-primary/30 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">📦 Context Window</span>
            <span className="text-xs bg-primary/30 px-2 py-0.5 rounded-full">
              {messages.length}/{maxMessages} slots
            </span>
          </div>

          {/* Messages container */}
          <div className="p-3 min-h-[200px] space-y-2">
            {messages.map((msg, index) => (
              <motion.div
                key={`${msg}-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                className={`px-3 py-2 rounded-lg text-sm ${
                  index === 0 && messages.length >= maxMessages
                    ? 'bg-warning/20 border border-warning/50 text-warning'
                    : 'bg-secondary/50 text-secondary-foreground'
                }`}
              >
                {index === 0 && messages.length >= maxMessages && (
                  <span className="text-xs mr-2">⚠️ Forgetting soon:</span>
                )}
                {msg}
              </motion.div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, maxMessages - messages.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="px-3 py-2 rounded-lg border-2 border-dashed border-muted text-muted-foreground text-sm text-center"
              >
                Empty slot
              </div>
            ))}
          </div>
        </div>

        {/* Forgotten messages indicator */}
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -left-2 top-1/2 -translate-y-1/2 bg-destructive/10 border border-destructive/30 rounded-lg p-2"
          >
            <span className="text-xl">👻</span>
            <p className="text-xs text-destructive mt-1">Forgotten</p>
          </motion.div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 max-w-sm">
        <p className="text-sm text-warning text-center">
          <strong>📦 Limited Memory!</strong>
          <br />
          <span className="text-xs">
            When the window is full, old messages get pushed out and forgotten.
          </span>
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-center text-sm">
        <div className="bg-secondary/30 rounded-lg px-3 py-2">
          <p className="font-bold text-secondary-foreground">{messages.length}</p>
          <p className="text-xs text-muted-foreground">In memory</p>
        </div>
        <div className="bg-secondary/30 rounded-lg px-3 py-2">
          <p className="font-bold text-secondary-foreground">{maxMessages}</p>
          <p className="text-xs text-muted-foreground">Max capacity</p>
        </div>
      </div>
    </div>
  );
};
