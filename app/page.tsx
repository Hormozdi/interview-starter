import SearchBox from "@/components/SearchBox";
import WordCard from "@/components/WordCard";
import { getBookmarks } from "./actions";
import LanguageSwitcher from "@/components/LanguageSwitcher";

async function fetchWords(q: string) {
  const url = q ? `/api/words?q=${encodeURIComponent(q)}` : "/api/words";
  const res = await fetch(url); 
  if (!res.ok) throw new Error("Failed to load words");
  const data = await res.json();
  return data.items as Word[];
}

export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q ?? "";
  const items = await fetchWords(q);
  const bookmarkIds = await getBookmarks();

  const lang = getLangFromCookie();

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <LanguageSwitcher current={lang} />
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Bookmarks: <span className="font-semibold">{bookmarkIds.length}</span>
        </div>
      </header>

      
      <SearchClient defaultQuery={q} placeholder={placeholder} />

      {items.length === 0 ? (
        <p className="text-slate-500">No results. Try a different query.</p>
      ) : (
        <WordCardsList items={items} query={q} bookmarkIds={bookmarkIds} />
      )}
    </main>
  );
}
