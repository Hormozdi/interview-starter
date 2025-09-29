"use server";

import { readBookmarks, writeBookmarks } from "@/lib/cookies";

export async function toggleBookmark(id: number) {
  const ids = await readBookmarks();
  const has = ids.includes(id);
  const next = has ? ids.filter(x => x !== id) : [...ids, id];
  await writeBookmarks(next);
  return { ok: true, ids: next };
}

export async function getBookmarks() {
  return await readBookmarks();
}
