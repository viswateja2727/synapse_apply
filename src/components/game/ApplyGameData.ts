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
  definition: string;
}

// Concepts that teens will match scenarios to
export const CONCEPT_OPTIONS: ConceptOption[] = [
  { id: 1, concept: "Token", emoji: "🧩", definition: "A token is the smallest unit of text an AI processes — it could be a word, part of a word, or even punctuation." },
  { id: 2, concept: "LLM", emoji: "🤖", definition: "A Large Language Model is an AI trained on massive text data to understand and generate human-like language." },
  { id: 3, concept: "Context", emoji: "🧠", definition: "Context is the information from your conversation that helps the AI understand what you're talking about." },
  { id: 4, concept: "Prompt", emoji: "💬", definition: "A prompt is the input or instruction you give to an AI to get a response." },
  { id: 5, concept: "Embedding", emoji: "🔢", definition: "Embeddings convert words into numerical vectors so AI can understand meaning and find similarities." },
  { id: 6, concept: "Training", emoji: "📚", definition: "Training is when an AI learns patterns from large datasets to improve its predictions." },
  { id: 7, concept: "Transformer Layers", emoji: "🏗️", definition: "Transformer layers are processing blocks in AI that analyze relationships between words in text." },
  { id: 8, concept: "Logits", emoji: "📊", definition: "Logits are raw output scores from an AI before they're converted into probabilities." },
  { id: 9, concept: "Softmax", emoji: "📈", definition: "Softmax converts raw scores into probabilities that add up to 100%, helping AI choose the best answer." },
  { id: 10, concept: "Prompting", emoji: "✨", definition: "Prompting is the skill of crafting effective instructions to get better responses from AI." },
  { id: 11, concept: "Context Window", emoji: "📦", definition: "The context window is the maximum amount of text an AI can process at once." },
  { id: 12, concept: "Hallucinations", emoji: "👻", definition: "Hallucinations are when AI confidently generates false or made-up information." },
];

// Real-world scenarios for each concept (16 scenarios covering all concepts)
export const SCENARIOS: ScenarioItem[] = [
  {
    id: 1,
    scenario: "When you type 'Hello, how are you?' to ChatGPT, it splits your message into smaller chunks like 'Hello', ',', 'how', 'are', 'you', '?'",
    correctConceptId: 1, // Token
    hint: "Think about breaking text into pieces"
  },
  {
    id: 2,
    scenario: "The word 'incredible' might be split into 'in', 'cred', and 'ible' by the AI before processing",
    correctConceptId: 1, // Token
    hint: "Think about how words are broken down"
  },
  {
    id: 3,
    scenario: "ChatGPT reads millions of books and articles to learn language patterns, then uses those patterns to guess what word should come next",
    correctConceptId: 2, // LLM
    hint: "Think about a machine that predicts patterns"
  },
  {
    id: 4,
    scenario: "GPT-4 and Claude are examples of AI systems trained on massive amounts of text data to understand and generate human language",
    correctConceptId: 2, // LLM
    hint: "Think about large AI language systems"
  },
  {
    id: 5,
    scenario: "When you ask a follow-up question like 'Tell me more about that', the AI remembers what 'that' refers to from your previous messages",
    correctConceptId: 3, // Context
    hint: "Think about AI's conversation memory"
  },
  {
    id: 6,
    scenario: "You type 'Write me a poem about rainbows' to start a conversation with an AI assistant",
    correctConceptId: 4, // Prompt
    hint: "Think about the initial instruction"
  },
  {
    id: 7,
    scenario: "Google Search converts your search query into a list of numbers so it can find similar content mathematically",
    correctConceptId: 5, // Embedding
    hint: "Think about turning words into numbers"
  },
  {
    id: 8,
    scenario: "The AI converts 'dog' and 'puppy' into number sequences that are mathematically close together because they mean similar things",
    correctConceptId: 5, // Embedding
    hint: "Think about representing meaning with numbers"
  },
  {
    id: 9,
    scenario: "OpenAI showed GPT billions of text examples so it could learn grammar, facts, and reasoning abilities",
    correctConceptId: 6, // Training
    hint: "Think about teaching AI with data"
  },
  {
    id: 10,
    scenario: "Inside GPT-4, your message passes through 96 different processing stages where each stage adds more understanding",
    correctConceptId: 7, // Transformer Layers
    hint: "Think about processing blocks in neural networks"
  },
  {
    id: 11,
    scenario: "Before the AI chooses the next word, it calculates raw scores like: 'happy' = 2.1, 'sad' = -0.5, 'excited' = 1.8",
    correctConceptId: 8, // Logits
    hint: "Think about raw output scores"
  },
  {
    id: 12,
    scenario: "The AI converts raw scores into probabilities: 'happy' = 45%, 'excited' = 35%, 'sad' = 20%",
    correctConceptId: 9, // Softmax
    hint: "Think about converting scores to percentages"
  },
  {
    id: 13,
    scenario: "A developer writes 'Act as a friendly teacher. Explain topics simply. Use examples.' to make the AI respond in a specific style",
    correctConceptId: 10, // Prompting
    hint: "Think about crafting AI instructions"
  },
  {
    id: 14,
    scenario: "Adding 'Let's think step by step' to your request makes the AI break down complex problems into smaller parts",
    correctConceptId: 10, // Prompting
    hint: "Think about engineering better instructions"
  },
  {
    id: 15,
    scenario: "Claude can only remember the last 100,000 tokens of your conversation - if you paste a very long document, it might forget the beginning",
    correctConceptId: 11, // Context Window
    hint: "Think about maximum memory capacity"
  },
  {
    id: 16,
    scenario: "ChatGPT confidently tells you that the Eiffel Tower is in London, even though it's actually in Paris",
    correctConceptId: 12, // Hallucinations
    hint: "Think about AI generating false information"
  },
];

export const APPLY_GAME_CONFIG = {
  questionsPerGame: 16,
  correctPoints: 100,
  wrongPenalty: -25,
  hintPenalty: 15, // Positive value, will be subtracted when hint is used
  optionsPerQuestion: 4,
  starThresholds: {
    oneStar: 600,
    twoStars: 1000,
    threeStars: 1400
  }
};
