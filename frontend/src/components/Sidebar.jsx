import { Award, Bookmark, Compass, House, Plus, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext";

function Sidebar() {
  const { savedCount } = useBookmarks();

  return (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-surface-container border-r border-outline-variant py-8 px-6 z-50">
      <div className="mb-10 px-2">
        <h1 className="font-display text-2xl font-bold text-primary-fixed-dim flex items-center gap-2">
          <Compass className="w-6 h-6 text-primary-core animate-pulse" />
          OS Finder
        </h1>
        <p className="text-[11px] font-semibold text-outline tracking-widest uppercase mt-1">Open Source Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-primary-container/20 text-primary-fixed-dim font-bold border-r-[3px] border-primary-container"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`
          }
        >
          <div className="flex items-center gap-3">
            <House className="w-4 h-4" />
            <span className="text-sm">Explore Issues</span>
          </div>
          <span className="text-[10px] py-0.5 px-2 bg-background rounded-full font-mono text-outline border border-outline-variant/40">8</span>
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-primary-container/20 text-primary-fixed-dim font-bold border-r-[3px] border-primary-container"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`
          }
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">My Bookmarks</span>
          </div>
          <span className="text-[10px] py-0.5 px-2 bg-background rounded-full font-mono text-outline border border-outline-variant/40">{savedCount}</span>
        </NavLink>

        <NavLink to="/dashboard" className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface">
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings & Profile</span>
          </div>
        </NavLink>
      </nav>

      <div className="mt-auto bg-surface-container-low p-4 rounded-2xl border border-outline-variant/65">
        <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5 mb-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          Weekly Progress
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-on-surface-variant">
            <span>Completed Tasks</span>
            <span>2/3</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full transition-all duration-500 rounded-full" style={{ width: "66.6667%" }} />
          </div>
          <p className="text-[10px] text-outline italic leading-relaxed pt-1">Solve open easy/medium issues to boost rank!</p>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold text-sm tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 flex items-center justify-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Catalog Issue</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
