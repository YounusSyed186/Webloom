/**
 * AI Safety, Prompt Injection Protection, and Sensitive Data Redaction
 */

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+override/i,
  /reveal\s+(the\s+)?(api\s+key|secret|password|token)/i,
  /drop\s+table/i,
  /delete\s+from\s+public\./i,
  /bypass\s+(authorization|rls|security)/i,
  /you\s+are\s+now\s+in\s+developer\s+mode/i,
];

const CREDIT_CARD_REGEX = /\b(?:\d{4}[-\s]?){3}\d{4}\b/g;
const CVV_REGEX = /\bcvv[:\s]*\d{3,4}\b/gi;

export interface SafetyCheckResult {
  isSafe: boolean;
  sanitizedPrompt: string;
  flaggedReason?: string;
}

export function validateAndSanitizePrompt(prompt: string): SafetyCheckResult {
  if (!prompt || typeof prompt !== 'string') {
    return { isSafe: false, sanitizedPrompt: '', flaggedReason: 'Prompt must be a non-empty string' };
  }

  // 1. Check Prompt Injection
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(prompt)) {
      return {
        isSafe: false,
        sanitizedPrompt: '',
        flaggedReason: 'Prompt contains unauthorized instruction override attempt.',
      };
    }
  }

  // 2. Redact Sensitive Financial / Auth Data
  let sanitized = prompt.replace(CREDIT_CARD_REGEX, '[REDACTED_CARD]');
  sanitized = sanitized.replace(CVV_REGEX, '[REDACTED_CVV]');

  return {
    isSafe: true,
    sanitizedPrompt: sanitized,
  };
}

