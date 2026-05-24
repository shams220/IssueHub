import { Flame } from "lucide-react";
import { difficulties, stacks, tags } from "../utils/issues";
import { useFilters } from "../context/FilterContext";
import SearchBar from "./SearchBar";

function FilterSidebar() {
  const { stack, setStack, difficulty, setDifficulty, tag, setTag, beginnerMode, setBeginnerMode } = useFilters();

  return (
    <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <SearchBar />

        <div className="flex flex-wrap gap-2.5 w-full lg:w-auto">
          <div className="flex flex-col gap-1 min-w-[120px] flex-1 sm:flex-initial">
            <select value={stack} onChange={(event) => setStack(event.target.value)} className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none cursor-pointer">
              {stacks.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Tech Stacks" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-[120px] flex-1 sm:flex-initial">
            <select 
              value={beginnerMode ? "Easy" : difficulty} 
              onChange={(event) => setDifficulty(event.target.value)} 
              disabled={beginnerMode}
              className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {difficulties.map((item) => (
                <option key={item} value={item}>
                  {item === "All" && "All Difficulties"}
                  {item === "Easy" && "Easy (Beginner)"}
                  {item === "Medium" && "Medium (Intermediate)"}
                  {item === "Hard" && "Hard (Expert)"}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-[120px] flex-1 sm:flex-initial">
            <select value={tag} onChange={(event) => setTag(event.target.value)} className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none cursor-pointer">
              {tags.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Scope Tags" : item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-surface-dim px-4 py-2 rounded-2xl border border-outline-variant">
          <span className="text-xs font-bold text-on-surface flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Beginner Mode
          </span>
          <button
            onClick={() => setBeginnerMode(!beginnerMode)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${beginnerMode ? "bg-primary-container" : "bg-outline-variant"}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${beginnerMode ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FilterSidebar;
