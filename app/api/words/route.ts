import { NextResponse } from "next/server";
import { searchWords } from "@/lib/words";
import { z } from "zod";

export const revalidate = 3600; 
const Query = z.object({ q: z.any() }); 
export function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = Query.safeParse({ q: url.searchParams.get("q") });
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad query" }, { status: 400 });
  }
  const q = String(parsed.data.q || "");
  const items = searchWords(q);
  return NextResponse.json({ items });
}
