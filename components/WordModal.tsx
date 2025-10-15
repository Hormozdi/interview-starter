"use client";

import WordCard from "./WordCard";

export default function WordModal({
  item,
  isBookmarked,
  resetSelectedItem,
}: {
  item: Word;
  isBookmarked: boolean;
  resetSelectedItem: () => void;
}) {
  return (
    <div
      style={{ direction: "ltr" }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="flex !-my-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-slate-500 bg-opacity-70"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <WordCard item={item} isBookmarked={isBookmarked} />
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={resetSelectedItem}
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
