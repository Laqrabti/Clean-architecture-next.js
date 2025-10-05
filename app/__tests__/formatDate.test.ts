import { describe, it, expect } from 'vitest';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

describe('formatDate', () => {
  it('formats date correctly', () => {
    const testDate = new Date(2025, 0, 15); // Jan 15, 2025
    expect(formatDate(testDate)).toBe('2025-01-15');
  });
});