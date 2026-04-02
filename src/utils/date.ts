export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year) return dateStr;
  if (!month) return year;
  if (!day) return `${year}.${month}`;
  return `${year}.${month}.${day}`;
}
