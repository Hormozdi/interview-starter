"use client";

import useSearchStore from "@/app/storages/useSearchStore";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  defaultQuery?: string;
  onChange: (q: string) => void;
  placeholder: string;
};

export default function SearchBox({
  defaultQuery = "",
  onChange,
  placeholder,
}: Props) {
  const [q, setQ] = useState(defaultQuery);
  const t = useRef<number | null>(null);

  const selectFirstIndex = useSearchStore((state) => state.selectFirstIndex);
  const resetIndex = useSearchStore((state) => state.resetIndex);

  const debounced = useMemo(
    () => (value: string) => {
      if (t.current) clearTimeout(t.current);
      // @ts-ignore
      t.current = setTimeout(() => onChange(value), 250);
      resetIndex();
    },
    [onChange, q]
  );

  useEffect(() => {
    debounced(q);
  }, [q]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") selectFirstIndex();
  };

  return (
    <label className="block">
      <span className="sr-only">Search words</span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={`${placeholder} (e.g., ab)`}
        aria-label="Search words"
        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        onKeyDown={handleKeyDown}
      />
    </label>
  );
}
