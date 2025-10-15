"use client";

import useSearchStore from "@/app/storages/useSearchStore";
import WordCard from "./WordCard";
import WordModal from "./WordModal";
import { useState } from "react";

export default function WordCardsList({
  items,
  query,
  bookmarkIds,
}: {
  items: Word[];
  query: string;
  bookmarkIds: number[];
}) {
  const selectedIndex = useSearchStore((state) => state.selectedIndex);
  const increaseIndex = useSearchStore((state) => state.increaseIndex);
  const decreaseIndex = useSearchStore((state) => state.decreaseIndex);
  const resetIndex = useSearchStore((state) => state.resetIndex);

  const [selectedItem, setSelectedItem] = useState<Word | undefined>();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && items.length - 1 > selectedIndex) {
      e.preventDefault();

      increaseIndex();
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      e.preventDefault();
      decreaseIndex();
    } else if (e.key === "Enter") {
      e.preventDefault();
      setSelectedItem(items[selectedIndex]);
    }
  };

  const resetSelectedItem = () => {
    setSelectedItem(undefined);
  };

  return (
    <>
      <div
        className="grid gap-3"
        tabIndex={-1}
        onBlur={(e) => {
          const currentTarget = e.currentTarget;
          const nextFocused = e.relatedTarget as Node | null;

          if (!currentTarget.contains(nextFocused)) {
            resetIndex();
          }
        }}
      >
        {items.map((w, index) => (
          <WordCard
            key={w.id}
            item={w}
            query={query}
            isBookmarked={bookmarkIds.includes(w.id)}
            index={index}
            selectedIndex={selectedIndex}
            handleKeyDown={handleKeyDown}
          />
        ))}
      </div>
      {selectedItem ? (
        <WordModal
          item={selectedItem}
          isBookmarked={bookmarkIds.includes(selectedItem.id)}
          resetSelectedItem={resetSelectedItem}
        />
      ) : (
        <></>
      )}
    </>
  );
}
