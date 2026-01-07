import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ApplyStartScreenProps {
  onStart: () => void;
}

export const ApplyStartScreen = ({ onStart }: ApplyStartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center space-y-8 max-w-lg">
        {/* Icon */}
        <div className="relative mx-auto w-28 h-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl animate-pulse" />
          <div className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl">
            <Lightbulb className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-foreground">SYNAPSE</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              APPLY
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Match Real Scenarios to AI Concepts
          </p>
        </div>

        {/* Description */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <p className="text-foreground/80 text-base leading-relaxed">
            You've learned the definitions — now see how they work in the real world! 
            Read each scenario and match it to the correct AI concept.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="bg-primary/10 px-3 py-1 rounded-full">No Timer</span>
            <span className="bg-secondary/10 px-3 py-1 rounded-full">8 Scenarios</span>
            <span className="bg-accent/10 px-3 py-1 rounded-full">Hints Available</span>
          </div>
        </div>

        {/* How to Play */}
        <div className="text-left bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/40">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-sm">📖</span>
            How to Play
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              Read the real-world scenario carefully
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              Choose which AI concept it describes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              Use hints if you're stuck (costs points)
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white font-bold text-xl px-12 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          START LEARNING
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Link back to Rush */}
        <Link 
          to="/"
          className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Need to learn definitions first? Try Synapse Rush
        </Link>
      </div>
    </div>
  );
};
