import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Lingano Mini Dictionary (Interview Starter)",
  description: "Fix bugs and add features"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
