import intlFormat from 'date-fns/intlFormat';

export function formatTimeStamp(
  date: Date,
  locale: string | string[] = 'en-CA'
): string {
  return intlFormat(
    date,
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
    { locale }
  );
}
