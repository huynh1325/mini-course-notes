export function parseExpire(expireStr: string | undefined): number {
  if (!expireStr) return 600;
  const match = expireStr.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 600;

  const value = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    case 'd': return value * 86400;
    default: return value;
  }
}
