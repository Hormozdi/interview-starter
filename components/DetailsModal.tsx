"use client";
import { useEffect, useRef } from "react";

export default function DetailsModal({
  open, onClose, title, children
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div ref={ref} className="bg-white dark:bg-slate-900 rounded-2xl p-4 max-w-lg w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 id="modalTitle" className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
