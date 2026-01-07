export interface ConceptLesson {
  id: number;
  concept: string;
  emoji: string;
  title: string;
  simpleExplanation: string;
  animationType: 'token' | 'llm' | 'context' | 'prompt' | 'embedding' | 'training' | 'transformer' | 'logits' | 'softmax' | 'prompting' | 'contextWindow' | 'hallucination';
}

export const CONCEPT_LESSONS: ConceptLesson[] = [
  {
    id: 1,
    concept: "Token",
    emoji: "🧩",
    title: "Tokens: Breaking Text Into Pieces",
    simpleExplanation: "AI reads text by breaking it into small chunks called tokens. Each word or punctuation becomes a separate piece that the AI can understand.",
    animationType: 'token'
  },
  {
    id: 2,
    concept: "LLM",
    emoji: "🤖",
    title: "Large Language Model: The Pattern Learner",
    simpleExplanation: "An LLM is like a super-reader that has read millions of books. It learns patterns in language to predict what word should come next.",
    animationType: 'llm'
  },
  {
    id: 3,
    concept: "Context",
    emoji: "🧠",
    title: "Context: The AI's Memory",
    simpleExplanation: "Context is everything the AI remembers from your conversation. It uses this memory to understand what you're talking about.",
    animationType: 'context'
  },
  {
    id: 4,
    concept: "Prompt",
    emoji: "💬",
    title: "Prompt: Your Starting Message",
    simpleExplanation: "A prompt is the message you type to start a conversation with AI. It tells the AI what you want to know or do.",
    animationType: 'prompt'
  },
  {
    id: 5,
    concept: "Embedding",
    emoji: "🔢",
    title: "Embedding: Words as Numbers",
    simpleExplanation: "Computers can't read words directly. Embeddings convert words into lists of numbers so the AI can do math with them.",
    animationType: 'embedding'
  },
  {
    id: 6,
    concept: "Training",
    emoji: "📚",
    title: "Training: Teaching the AI",
    simpleExplanation: "Training is when we show the AI billions of examples so it can learn patterns. Like studying before a test, but with way more examples!",
    animationType: 'training'
  },
  {
    id: 7,
    concept: "Transformer Layers",
    emoji: "🏗️",
    title: "Transformer Layers: Processing Stages",
    simpleExplanation: "Your message passes through many layers inside the AI. Each layer adds more understanding, like passing through different experts.",
    animationType: 'transformer'
  },
  {
    id: 8,
    concept: "Logits",
    emoji: "📊",
    title: "Logits: Raw Prediction Scores",
    simpleExplanation: "Before choosing the next word, the AI calculates a score for every possible word. These raw scores are called logits.",
    animationType: 'logits'
  },
  {
    id: 9,
    concept: "Softmax",
    emoji: "📈",
    title: "Softmax: Scores to Probabilities",
    simpleExplanation: "Softmax converts raw scores into percentages that add up to 100%. This helps the AI pick the most likely next word.",
    animationType: 'softmax'
  },
  {
    id: 10,
    concept: "Prompting",
    emoji: "✨",
    title: "Prompting: Crafting Instructions",
    simpleExplanation: "Prompting is the art of writing clear instructions for AI. Good prompts get better answers, like asking the right questions.",
    animationType: 'prompting'
  },
  {
    id: 11,
    concept: "Context Window",
    emoji: "📦",
    title: "Context Window: Memory Limit",
    simpleExplanation: "The context window is how much the AI can remember at once. If your conversation is too long, it forgets the beginning.",
    animationType: 'contextWindow'
  },
  {
    id: 12,
    concept: "Hallucination",
    emoji: "👻",
    title: "Hallucinations: When AI Makes Things Up",
    simpleExplanation: "Sometimes AI confidently says things that aren't true. These false statements are called hallucinations.",
    animationType: 'hallucination'
  }
];
