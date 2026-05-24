import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [stack, setStack] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [tag, setTag] = useState("All");
  const [beginnerMode, setBeginnerMode] = useState(false);

  const value = {
    search,
    setSearch,
    stack,
    setStack,
    difficulty,
    setDifficulty,
    tag,
    setTag,
    beginnerMode,
    setBeginnerMode,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  return useContext(FilterContext);
}
