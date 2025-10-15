type Lang = "en" | "fa";

type DICT = Record<Lang, Record<string, string>>;

type Word = {
  id: number;
  word: string;
  phonetic?: string;
  definitions: string[];
  examples?: string[];
};
