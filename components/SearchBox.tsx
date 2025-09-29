"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = { defaultQuery?: string; onChange: (q: string) => void };

export default function SearchBox({ defaultQuery = "", onChange }: Props) {
  const [q, setQ] = useState(defaultQuery);
  const t = useRef<number | null>(null);

  const debounced = useMemo(
    () => (value: string) => {
      if (t.current) clearTimeout(t.current);
      // @ts-ignore
      t.current = setTimeout(() => onChange(value), 250);
    },
    [onChange, q]
  );

  useEffect(() => {
    debounced(q);
  }, [q]);

  return (
    <label className="block">
      <span className="sr-only">Search words</span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search words… (e.g., ab)"
        aria-label="Search words"
        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}
