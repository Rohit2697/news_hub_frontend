export default function dateToString(isoString: string): string {
  const date = new Date(isoString);


  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };


  return date.toLocaleString('en-US', options);
}




