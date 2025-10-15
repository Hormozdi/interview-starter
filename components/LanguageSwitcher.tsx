"use client";

import { useState, useTransition } from "react";
import { setLang } from "@/app/actions/setLang";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher({
  current,
}: {
  current: "en" | "fa";
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [lang, setLocalLang] = useState<"en" | "fa">(current);

  async function toggle() {
    const next = lang === "en" ? "fa" : "en";
    setLocalLang(next);
    startTransition(async () => {
      try {
        await setLang(next);
        router.refresh();
      } catch (e) {
        // rollback on error
        setLocalLang(lang);
        console.error(e);
      }
    });
  }

  return (
    <button
      onClick={toggle}
      aria-label="Change language"
      className="px-2 py-1 border rounded"
      disabled={isPending}
    >
      {lang === "en" ? "EN" : "فا"}
    </button>
  );
}
