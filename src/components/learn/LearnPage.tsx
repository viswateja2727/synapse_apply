import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONCEPT_LESSONS } from './ConceptData';
import { TokenAnimation } from './animations/TokenAnimation';
import { LLMAnimation } from './animations/LLMAnimation';
import { ContextAnimation } from './animations/ContextAnimation';
import { PromptAnimation } from './animations/PromptAnimation';
import { EmbeddingAnimation } from './animations/EmbeddingAnimation';
import { TrainingAnimation } from './animations/TrainingAnimation';
import { TransformerAnimation } from './animations/TransformerAnimation';
import { LogitsAnimation } from './animations/LogitsAnimation';
import { SoftmaxAnimation } from './animations/SoftmaxAnimation';
import { PromptingAnimation } from './animations/PromptingAnimation';
import { ContextWindowAnimation } from './animations/ContextWindowAnimation';
import { HallucinationAnimation } from './animations/HallucinationAnimation';

const AnimationComponents: Record<string, React.ComponentType> = {
  token: TokenAnimation,
  llm: LLMAnimation,
  context: ContextAnimation,
  prompt: PromptAnimation,
  embedding: EmbeddingAnimation,
  training: TrainingAnimation,
  transformer: TransformerAnimation,
  logits: LogitsAnimation,
  softmax: SoftmaxAnimation,
  prompting: PromptingAnimation,
  contextWindow: ContextWindowAnimation,
  hallucination: HallucinationAnimation,
};

export const LearnPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lesson = CONCEPT_LESSONS[currentIndex];
  const AnimationComponent = AnimationComponents[lesson.animationType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-sky-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {CONCEPT_LESSONS.length}
          </span>
        </div>

        {/* Main content */}
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          {/* Title */}
          <div className="bg-primary/10 p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{lesson.emoji}</span>
              <h1 className="text-xl font-bold text-foreground">{lesson.title}</h1>
            </div>
          </div>

          {/* Animation */}
          <div className="min-h-[400px] flex items-center justify-center">
            <AnimationComponent />
          </div>

          {/* Explanation */}
          <div className="bg-secondary/30 p-4 border-t border-border">
            <p className="text-center text-foreground">{lesson.simpleExplanation}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <Button
            onClick={() => setCurrentIndex(i => Math.min(CONCEPT_LESSONS.length - 1, i + 1))}
            disabled={currentIndex === CONCEPT_LESSONS.length - 1}
          >
            Next <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 mt-4 flex-wrap">
          {CONCEPT_LESSONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
