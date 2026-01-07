import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TransformerAnimation = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const layers = [
    { name: "Input", description: "Raw text enters", icon: "📝" },
    { name: "Layer 1", description: "Basic patterns", icon: "🔤" },
    { name: "Layer 2", description: "Word relationships", icon: "🔗" },
    { name: "Layer 3", description: "Grammar rules", icon: "📐" },
    { name: "Layer 4", description: "Meaning", icon: "💡" },
    { name: "Output", description: "Understanding!", icon: "✨" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % (layers.length + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Input text */}
      <div className="bg-card rounded-lg px-4 py-2 shadow-md border border-border">
        <span className="text-sm text-muted-foreground">Input: </span>
        <span className="font-medium text-foreground">"The cat sat"</span>
      </div>

      {/* Layers visualization */}
      <div className="flex flex-col gap-2 w-full max-w-sm">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: activeLayer >= index ? 1 : 0.3,
              scale: activeLayer === index ? 1.02 : 1,
              x: activeLayer === index ? 5 : 0
            }}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              activeLayer >= index
                ? 'bg-primary/10 border-primary/40'
                : 'bg-muted/30 border-border'
            }`}
          >
            {/* Layer icon */}
            <motion.span 
              className="text-2xl"
              animate={activeLayer === index ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {layer.icon}
            </motion.span>

            {/* Layer info */}
            <div className="flex-1">
              <p className={`font-medium text-sm ${
                activeLayer >= index ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {layer.name}
              </p>
              <p className="text-xs text-muted-foreground">{layer.description}</p>
            </div>

            {/* Progress indicator */}
            {activeLayer > index && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-success"
              >
                ✓
              </motion.span>
            )}

            {activeLayer === index && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Data flow visualization */}
      <motion.div
        animate={{ 
          background: [
            'linear-gradient(to right, hsl(var(--primary)/0.3), transparent)',
            'linear-gradient(to right, transparent, hsl(var(--primary)/0.3))'
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-full max-w-sm h-1 rounded-full"
      />

      {/* Explanation */}
      <p className="text-sm text-muted-foreground text-center max-w-sm">
        Each layer adds more understanding, like passing through different experts! 🏗️
      </p>
    </div>
  );
};
