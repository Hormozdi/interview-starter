"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/SearchBox";

export default function SearchClient({
  defaultQuery,
  placeholder,
}: {
  defaultQuery: string;
  placeholder: string;
}) {
  const router = useRouter();
  const onChange = useCallback(
    (next: string) => {
      const params = new URLSearchParams();
      if (next.trim()) params.set("q", next.trim());
      const url = params.toString() ? `/?${params.toString()}` : "/";
      router.replace(url);
    },
    [router]
  );

  return (
    <SearchBox
      defaultQuery={defaultQuery}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
