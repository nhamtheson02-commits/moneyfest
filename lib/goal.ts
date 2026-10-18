export function monthlyNeeded(target: number, years: number, current: number, ratePercent: number) {
  const months = Math.round(years * 12);
  const monthlyRate = ratePercent / 100 / 12;
  const grownCurrent = current * Math.pow(1 + monthlyRate, months);
  const gap = target - grownCurrent;
  if (gap <= 0) return 0;
  if (monthlyRate === 0) return gap / months;
  return (gap * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
}
