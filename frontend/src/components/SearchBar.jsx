import { Search } from "lucide-react";
import { useFilters } from "../context/FilterContext";

function SearchBar() {
  const { search, setSearch } = useFilters();

  return (
    <div className="w-full lg:max-w-md relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
      <input
        placeholder="Search frameworks, issues, keyword tags..."
        className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-2xl py-3 pl-11 pr-4 text-sm text-on-surface placeholder:text-outline-variant transition-all outline-none"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
