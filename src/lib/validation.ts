import { RESERVED_USERNAMES } from './constants';

export function normalizeUsername(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^@+/, '')
    .replace(/[^a-z0-9_-]/g, '-');
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  const normalized = normalizeUsername(username);

  if (!normalized) {
    return { valid: false, error: 'Username cannot be empty.' };
  }

  if (normalized.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters long.' };
  }

  if (normalized.length > 30) {
    return { valid: false, error: 'Username cannot exceed 30 characters.' };
  }

  if (!/^[a-z0-9_-]+$/.test(normalized)) {
    return { valid: false, error: 'Username can only contain alphanumeric characters, dashes, and underscores.' };
  }

  if (RESERVED_USERNAMES.has(normalized)) {
    return { valid: false, error: `'${normalized}' is a reserved system handle and cannot be used.` };
  }

  return { valid: true };
}

export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();

  // Reject dangerous pseudo-protocols
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('file:')
  ) {
    return false;
  }

  // Allow standard web protocols and communication protocols
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('/')
  );
}

export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (isSafeUrl(trimmed)) {
    return trimmed;
  }
  // If user entered e.g. "github.com/user" without protocol, prepend https://
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return '';
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  const maxBytes = 5 * 1024 * 1024; // 5 MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, WEBP, GIF, and SVG images are supported.' };
  }

  if (file.size > maxBytes) {
    return { valid: false, error: 'Image size exceeds the 5MB maximum upload limit.' };
  }

  return { valid: true };
}
