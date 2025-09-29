export function splitForHighlight(text: string, query: string): Array<{ text: string; hit: boolean }> {
  if (!query) return [{ text, hit: false }];
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return [{ text, hit: false }];
  return [
    { text: text.slice(0, i), hit: false },
    { text: text.slice(i, i + query.length), hit: true },
    { text: text.slice(i + query.length), hit: false },
  ];
}
