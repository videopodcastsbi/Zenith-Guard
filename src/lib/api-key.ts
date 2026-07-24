// Simple mock API key utilities

export function generateApiKey(prefix = 'zg'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}_${key}`;
}

export function validateApiKey(key: string): boolean {
  // In a real app, this would check against a database or cache
  // For this mock, we just check if it has the right format
  if (!key) return false;
  return key.startsWith('zg_') || key.startsWith('sk_');
}

export function maskApiKey(key: string): string {
  if (!key || key.length < 12) return '***';
  
  const prefix = key.substring(0, 3); // e.g., 'zg_'
  const suffix = key.slice(-4);
  
  return `${prefix}${'*'.repeat(16)}${suffix}`;
}
