import { getBookmarks } from "./actions";
import SearchClient from "@/components/SearchClient";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLangFromCookie, _t } from "@/lib/i18n";
import WordCardsList from "@/components/WordCardsList";

async function fetchWords(q: string) {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL +
    (q ? `/api/words?q=${encodeURIComponent(q)}` : "/api/words");
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load words");
  const data = await res.json();
  return data.items as Word[];
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q ?? "";
  const items = await fetchWords(q);
  const bookmarkIds = await getBookmarks();

  const placeholder =
    process.env.NODE_ENV === "development" ? _t("Search dev…") : _t("Search…");

  const lang = getLangFromCookie();

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{_t("Lingano Mini Dictionary")}</h1>
        <LanguageSwitcher current={lang} />
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {_t("Bookmarks")}:{" "}
          <span className="font-semibold">{bookmarkIds.length}</span>
        </div>
      </header>

      <SearchClient defaultQuery={q} placeholder={placeholder} />

      {items.length === 0 ? (
        <p className="text-slate-500">
          {_t("No results. Try a different query")}.
        </p>
      ) : (
        <WordCardsList items={items} query={q} bookmarkIds={bookmarkIds} />
      )}
    </main>
  );
}
