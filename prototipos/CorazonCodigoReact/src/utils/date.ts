export function relationshipDuration(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.max(now.getTime() - start.getTime(), 0);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  return {
    years,
    months,
    days: days % 30,
    hours: hours % 24
  };
}
