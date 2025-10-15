"use server";

import { cookies } from "next/headers";

export async function setLang(lang: string) {
  const cookieStore = cookies();
  cookieStore.set({
    name: "lang",
    value: lang,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // یک سال
  });

  return { ok: true };
}
