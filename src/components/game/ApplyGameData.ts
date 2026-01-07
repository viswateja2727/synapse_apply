export interface ScenarioItem {
  id: number;
  scenario: string;
  correctConceptId: number;
  hint?: string;
}

export interface ConceptOption {
  id: number;
  concept: string;
  emoji: string;
}

// Concepts that teens will match scenarios to
export const CONCEPT_OPTIONS: ConceptOption[] = [
  { id: 1, concept: "Token", emoji: "🧩" },
  { id: 2, concept: "LLM", emoji: "🤖" },
  { id: 3, concept: "Context", emoji: "🧠" },
  { id: 4, concept: "Prompt", emoji: "💬" },
  { id: 5, concept: "Embedding", emoji: "🔢" },
  { id: 6, concept: "Training", emoji: "📚" },
  { id: 7, concept: "Transformer Layers", emoji: "🏗️" },
  { id: 8, concept: "Logits", emoji: "📊" },
  { id: 9, concept: "Softmax", emoji: "📈" },
  { id: 10, concept: "Prompting", emoji: "✨" },
  { id: 11, concept: "Context Window", emoji: "📦" },
  { id: 12, concept: "Hallucinations", emoji: "👻" },
];

// Real-world scenarios for each concept
export const SCENARIOS: ScenarioItem[] = [
  {
    id: 1,
    scenario: "When you type 'Hello, how are you?' to ChatGPT, it splits your message into smaller chunks like 'Hello', ',', 'how', 'are', 'you', '?'",
    correctConceptId: 1, // Token
    hint: "Think about breaking text into pieces"
  },
  {
    id: 2,
    scenario: "ChatGPT reads millions of books and articles to learn language patterns, then uses those patterns to guess what word should come next",
    correctConceptId: 2, // LLM
    hint: "Think about a machine that predicts patterns"
  },
  {
    id: 3,
    scenario: "When you ask a follow-up question like 'Tell me more about that', the AI remembers what 'that' refers to from your previous messages",
    correctConceptId: 3, // Context
    hint: "Think about AI's conversation memory"
  },
  {
    id: 4,
    scenario: "You type 'Write me a poem about rainbows' to start a conversation with an AI assistant",
    correctConceptId: 4, // Prompt
    hint: "Think about the initial instruction"
  },
  {
    id: 5,
    scenario: "Google Search converts your search query into a list of numbers so it can find similar content mathematically",
    correctConceptId: 5, // Embedding
    hint: "Think about turning words into numbers"
  },
  {
    id: 6,
    scenario: "OpenAI showed GPT billions of text examples so it could learn grammar, facts, and reasoning abilities",
    correctConceptId: 6, // Training
    hint: "Think about teaching AI with data"
  },
  {
    id: 7,
    scenario: "Inside GPT-4, your message passes through 96 different processing stages where each stage adds more understanding",
    correctConceptId: 7, // Transformer Layers
    hint: "Think about processing blocks in neural networks"
  },
  {
    id: 8,
    scenario: "Before the AI chooses the next word, it calculates raw scores like: 'happy' = 2.1, 'sad' = -0.5, 'excited' = 1.8",
    correctConceptId: 8, // Logits
    hint: "Think about raw output scores"
  },
  {
    id: 9,
    scenario: "The AI converts raw scores into probabilities: 'happy' = 45%, 'excited' = 35%, 'sad' = 20%",
    correctConceptId: 9, // Softmax
    hint: "Think about converting scores to percentages"
  },
  {
    id: 10,
    scenario: "A developer writes 'Act as a friendly teacher. Explain topics simply. Use examples.' to make the AI respond in a specific style",
    correctConceptId: 10, // Prompting
    hint: "Think about crafting AI instructions"
  },
  {
    id: 11,
    scenario: "Claude can only remember the last 100,000 tokens of your conversation - if you paste a very long document, it might forget the beginning",
    correctConceptId: 11, // Context Window
    hint: "Think about maximum memory capacity"
  },
  {
    id: 12,
    scenario: "ChatGPT confidently tells you that the Eiffel Tower is in London, even though it's actually in Paris",
    correctConceptId: 12, // Hallucinations
    hint: "Think about AI generating false information"
  },
];

export const APPLY_GAME_CONFIG = {
  questionsPerGame: 8,
  correctPoints: 100,
  wrongPenalty: -25,
  hintPenalty: -15,
  starThresholds: {
    oneStar: 300,
    twoStars: 500,
    threeStars: 700
  }
};
