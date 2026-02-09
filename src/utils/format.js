export function parseCurrency(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  // Remove $, commas, and whitespace
  const clean = value.replace(/[$, ]/g, '');
  return parseFloat(clean);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
