import { Play, Zap, Brain, Clock, Star, ArrowRight } from 'lucide-react';
import { BrainMascot } from './BrainMascot';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      {/* Title - matching Book Einstein style */}
      <div className="text-center animate-slide-up">
        <h1 className="text-5xl md:text-7xl font-black mb-2">
          <span className="text-foreground">SYNAPSE </span>
          <span className="text-primary">RUSH</span>
        </h1>
        <p className="text-xl text-muted-foreground font-semibold">
          Learn <span className="text-primary font-bold">AI</span> concepts at lightning speed! ⚡
        </p>
      </div>

      {/* Mascot */}
      <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <BrainMascot state="idle" size="lg" />
      </div>

      {/* How to Play */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full animate-slide-up"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="bg-card rounded-2xl p-5 text-center border border-border">
          <Brain className="w-10 h-10 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Match Concepts</h3>
          <p className="text-sm text-muted-foreground">Connect AI terms to their meanings</p>
        </div>
        <div className="bg-card rounded-2xl p-5 text-center border border-border">
          <Clock className="w-10 h-10 text-accent mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Beat the Clock</h3>
          <p className="text-sm text-muted-foreground">60 seconds to match them all!</p>
        </div>
        <div className="bg-card rounded-2xl p-5 text-center border border-border">
          <Star className="w-10 h-10 text-warning mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Earn Stars</h3>
          <p className="text-sm text-muted-foreground">Build streaks for bonus points</p>
        </div>
      </div>

      {/* Start Button - Orange like Book Einstein CTA */}
      <Button
        onClick={onStart}
        size="lg"
        className="animate-scale-in text-xl font-bold px-12 py-8 rounded-full 
                   bg-accent hover:bg-accent/90 hover:scale-110 
                   transition-all duration-300 text-accent-foreground shadow-lg"
        style={{ animationDelay: '0.6s' }}
      >
        <Play className="w-8 h-8 mr-2" />
        START GAME
        <Zap className="w-8 h-8 ml-2" />
      </Button>

      {/* Tips */}
      <div 
        className="text-center text-muted-foreground text-sm animate-slide-up max-w-md"
        style={{ animationDelay: '0.8s' }}
      >
        <p>💡 <strong>Tip:</strong> Wrong answers cost 50 points and 3 seconds!</p>
        <p className="mt-1">🔥 Build streaks for multiplied points!</p>
      </div>

      {/* Link to Apply Game */}
      <Link 
        to="/apply"
        className="animate-slide-up text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors"
        style={{ animationDelay: '1s' }}
      >
        Already know the definitions? Try Synapse Apply
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
