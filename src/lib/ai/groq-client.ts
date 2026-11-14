import Groq from 'groq-sdk';

/**
 * Supported Groq Models
 * - llama-3.3-70b-versatile: Recommended for complex reasoning, page generation, structured JSON
 * - llama-3.1-8b-instant: Recommended for low-latency copy and bio generation
 */
export const GROQ_MODELS = {
  VERSATILE: 'llama-3.3-70b-versatile',
  FAST: 'llama-3.1-8b-instant',
  MIXTRAL: 'mixtral-8x7b-32768',
} as const;

export type GroqModelId = typeof GROQ_MODELS[keyof typeof GROQ_MODELS];

let groqInstance: Groq | null = null;

export function getGroqClient(): Groq | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  if (!groqInstance) {
    groqInstance = new Groq({ apiKey });
  }
  return groqInstance;
}

