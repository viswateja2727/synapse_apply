export interface ConceptPair {
  id: number;
  concept: string;
  definition: string;
  emoji: string;
}

export const AI_CONCEPTS: ConceptPair[] = [
  {
    id: 1,
    concept: "Token",
    definition: "Breaking text into pieces",
    emoji: "🧩"
  },
  {
    id: 2,
    concept: "LLM",
    definition: "Pattern prediction machine",
    emoji: "🤖"
  },
  {
    id: 3,
    concept: "Context",
    definition: "AI's conversation memory",
    emoji: "🧠"
  },
  {
    id: 4,
    concept: "Prompt",
    definition: "Initial instruction to AI",
    emoji: "💬"
  },
  {
    id: 5,
    concept: "Embedding",
    definition: "Turning words into numbers",
    emoji: "🔢"
  },
  {
    id: 6,
    concept: "Training",
    definition: "Teaching AI with data",
    emoji: "📚"
  },
  {
    id: 7,
    concept: "Transformer Layers",
    definition: "Processing blocks in neural networks",
    emoji: "🏗️"
  },
  {
    id: 8,
    concept: "Logits",
    definition: "Raw output scores before normalization",
    emoji: "📊"
  },
  {
    id: 9,
    concept: "Softmax",
    definition: "Converting scores to percentage chances",
    emoji: "📈"
  },
  {
    id: 10,
    concept: "Prompting",
    definition: "Art of crafting AI instructions",
    emoji: "✨"
  },
  {
    id: 11,
    concept: "Context Window",
    definition: "Maximum memory capacity of AI",
    emoji: "📦"
  },
  {
    id: 12,
    concept: "Hallucinations",
    definition: "AI generating false information",
    emoji: "👻"
  }
];

export const GAME_CONFIG = {
  totalTime: 60,
  wrongAnswerPenalty: 50,
  timePenalty: 3,
  baseScore: 100,
  streakMultiplierBase: 0.5,
  urgentTimeThreshold: 10,
  starThresholds: {
    oneStar: 400,
    twoStars: 800,
    threeStars: 1000
  }
};
