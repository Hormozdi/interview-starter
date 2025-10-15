import words from "@/data/words.json";

export function searchWords(q: string): Word[] {
  const query = (q || "").trim().toLowerCase();
  if (!query) return (words as Word[]).slice(0, 20);
  return (words as Word[])
    .filter(w => w.word.toLowerCase().startsWith(query))
    .slice(0, 20);
}

export function getById(id: number): Word | undefined {
  return (words as Word[]).find(w => w.id === id);
}
