import { describe, it, expect, vi } from 'vitest';
import { calculateDateDifference } from '../app/ui/AgeForm';

// Mocking Date.now to control "current" time
vi.useFakeTimers();
vi.setSystemTime(new Date(2024, 4, 27)); // Setting current date to May 27, 2024

describe('calculateDateDifference', () => {
  it('calculates correct difference for a past date', () => {
    const setError = vi.fn(); // Mocking setError
    const result = calculateDateDifference('2020-05-25', setError);

    expect(result).toEqual({ years: 4, months: 0, days: 2 });
    expect(setError).not.toBeCalled();
  });

  it('handles future dates by setting errors', () => {
    const setError = vi.fn();
    const result = calculateDateDifference('2025-01-01', setError);

    expect(result).toBeUndefined();
    expect(setError).toBeCalledWith('day', {
      type: 'custom',
      message: 'Must be in the past.',
    });
  });

  it('correctly adjusts for month end overflow', () => {
    const setError = vi.fn();
    const result = calculateDateDifference('2024-04-30', setError);

    expect(result).toEqual({ years: 0, months: 0, days: 27 });
  });

  it('handles leap years correctly', () => {
    vi.setSystemTime(new Date(2024, 2, 1)); // Leap year adjustment
    const setError = vi.fn();
    const result = calculateDateDifference('2023-02-28', setError);

    expect(result).toEqual({ years: 1, months: 0, days: 2 });
  });
});
