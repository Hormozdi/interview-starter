import en from "@/locales/en.json";
import fa from "@/locales/fa.json";
import { cookies } from "next/headers";

const DICT: DICT = { en, fa };

export function getLangFromCookie(): Lang {
  try {
    const cookie = cookies().get("lang")?.value;
    if (cookie === "fa") return "fa";
  } catch (e) {
    // if called on client (shouldn't happen) or cookies not available
  }
  return "en";
}

export function getTranslations(lang?: Lang) {
  const l = lang ?? getLangFromCookie();
  return DICT[l];
}

export function _t(key: string, lang?: Lang) {
  const dict = getTranslations(lang);
  return dict[key] ?? key;
}
