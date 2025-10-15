import type { ReactNode } from "react";
import { getLangFromCookie } from "@/lib/i18n";

import "./globals.css";

export const metadata = {
  title: "Lingano Mini Dictionary (Interview Starter)",
  description: "Fix bugs and add features",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const lang = getLangFromCookie();
  const dir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body>
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
