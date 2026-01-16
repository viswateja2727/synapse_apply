import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Brain, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

interface ApplyStartScreenProps {
  onStart: () => void;
}

const features = [
  { icon: Brain, label: "16 Scenarios", color: "text-primary" },
  { icon: Target, label: "4 Options Each", color: "text-secondary" },
  { icon: Zap, label: "Hints Available", color: "text-accent" },
];

export const ApplyStartScreen = ({ onStart }: ApplyStartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <motion.div 
        className="text-center space-y-5 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Icon */}
        <motion.div 
          className="relative mx-auto w-24 h-24"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-full h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-2xl">
            <Lightbulb className="w-12 h-12 text-white drop-shadow-lg" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div 
          className="space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-foreground">SYNAPSE</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              APPLY
            </span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Match Real Scenarios to AI Concepts
          </p>
        </motion.div>

        {/* Description Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-foreground/80 text-sm leading-relaxed">
            You've learned the definitions — now see how they work in the real world! 
            Read each scenario and match it to the correct AI concept.
          </p>
          
          {/* Feature Pills */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-1.5 bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-1.5 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <feature.icon className={`w-3.5 h-3.5 ${feature.color}`} />
                <span className="text-xs font-semibold text-foreground/70">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Play */}
        <motion.div 
          className="text-left bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-sm">📖</span>
            How to Play
          </h3>
          <ul className="space-y-2">
            {[
              "Read the real-world scenario carefully",
              "Choose which AI concept it describes",
              "Learn from the definition after each answer"
            ].map((step, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-3 text-xs text-foreground/70"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <span className="w-5 h-5 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            START LEARNING
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};