import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { issues } from "../utils/issues";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const firstSaved = issues.filter((issue) => issue.saved).map((issue) => issue.id);
  const [savedIds, setSavedIds] = useState(firstSaved);

  function toggleBookmark(id) {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
      toast.success("Removed from bookmarks");
      return;
    }

    setSavedIds([...savedIds, id]);
    toast.success("Saved to bookmarks");
  }

  const value = {
    savedIds,
    savedCount: savedIds.length,
    toggleBookmark,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
