import { Bookmark, House, Plus, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext";

function MobileNav() {
  const { savedCount } = useBookmarks();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-45 bg-surface-container-low border-t border-outline-variant px-4 py-1.5 flex justify-around items-center h-16 md:hidden">
      <NavLink to="/explore" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${isActive ? "text-primary-fixed-dim" : "text-on-surface-variant hover:text-on-surface"}`}>
        <House className="w-5 h-5" />
        <span className="text-[9px] font-bold font-mono tracking-wide uppercase">Explore</span>
      </NavLink>

      <NavLink to="/saved" className={({ isActive }) => `relative flex flex-col items-center justify-center gap-1 transition-all ${isActive ? "text-primary-fixed-dim" : "text-on-surface-variant hover:text-on-surface"}`}>
        <Bookmark className="w-5 h-5" />
        <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-primary-container text-white text-[8px] font-bold flex items-center justify-center border border-background">{savedCount}</span>
        <span className="text-[9px] font-bold font-mono tracking-wide uppercase">Bookmarks</span>
      </NavLink>

      <button className="flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-on-surface">
        <Plus className="w-5 h-5 text-primary-core" />
        <span className="text-[9px] font-bold font-mono tracking-wide uppercase">Catalg</span>
      </button>

      <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${isActive ? "text-primary-fixed-dim" : "text-on-surface-variant hover:text-on-surface"}`}>
        <Settings className="w-5 h-5" />
        <span className="text-[9px] font-bold font-mono tracking-wide uppercase">Settings</span>
      </NavLink>
    </nav>
  );
}

export default MobileNav;
