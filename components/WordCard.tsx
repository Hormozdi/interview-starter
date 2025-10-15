"use client";
import { useTransition } from "react";
import { toggleBookmark } from "@/app/actions";
import { splitForHighlight } from "@/lib/highlight";
import { Bookmark, BookmarkCheck } from "lucide-react";
import clsx from "clsx";

export default function WordCard({
  item, query, isBookmarked, onBookmarked
}: {
  item: Word;
  query: string;
  isBookmarked: boolean;
  onBookmarked: (id: number, next: boolean) => void;
}) {
  const [pending, start] = useTransition();
  const parts = splitForHighlight(item.word, query);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight">
          {parts.map((p, i) => (
            <span key={i} className={p.hit ? "bg-yellow-200 dark:bg-yellow-600/40 rounded" : ""}>
              {p.text}
            </span>
          ))}
        </h3>
        <button
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          className={"inline-flex items-center justify-center rounded-lg border px-2 py-1 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" + (pending ? " opacity-60 cursor-wait" : "")}
          onClick={() => start(async () => {
            const res = await toggleBookmark(item.id);
            onBookmarked(item.id, !isBookmarked);
          })}
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
      {item.phonetic && (
        <div className="text-sm text-slate-500 dark:text-slate-400">{item.phonetic}</div>
      )}
      <ul className="list-disc pl-5 space-y-1">
        {item.definitions.map((d, i) => (
          <li key={i} className="text-sm">{d}</li>
        ))}
      </ul>
      {!!item.examples?.length && (
        <div className="mt-2">
          <div className="text-xs uppercase tracking-wide text-slate-500">Examples</div>
          <ul className="list-disc pl-5 space-y-1">
            {item.examples.map((e, i) => (
              <li key={i} className="text-sm italic">{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
