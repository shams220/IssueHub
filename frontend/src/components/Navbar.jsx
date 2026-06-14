import { CircleQuestionMark, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const userImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTh7vfgSffI7BzndJ2q8hSYCVISlBXsNrPi7afJug607-KMP4_KcP401NE5MvswpN7cXwryZ4MkRzy0rjuFxdIn8felY_cC3Rs_ZLGAW-QT7h_npL5pnPNC3hYxIEbuBi32qp81N_MEBfl3yewra9icmyxKrCIoCMm0tpk6prwL6HJYtjftXnGzigGkliM0g7LuhCVHF8lqSICdk8MXZgqQYKgpoQQ5Qzi-8MpY5zHgJ-RaNvP98lUfS2bH-wcwk3mLB66K7k2rBM";

function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const name = user?.name || "Guest";
  const handle = name.toLowerCase().replaceAll(" ", "-");

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md flex items-center justify-between h-16 px-4 md:px-8 border-b border-outline-variant">
      <div className="flex items-center gap-3 md:hidden">
        <h1 className="font-display font-bold text-lg text-primary-fixed-dim">OS Finder</h1>
      </div>

      <div className="hidden md:flex items-center gap-2">
        {/* <span className="text-xs font-mono font-bold bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full border border-outline-variant/40">
          {"\uD83D\uDE80"} AI Studio Assisted Workframe
        </span> */}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-primary-core transition-colors" title="Application Info Help">
          <CircleQuestionMark className="w-5 h-5" />
        </button>
        <button onClick={toggleTheme} className="p-2 text-on-surface-variant hover:text-primary-core transition-colors" title="Toggle theme">
          <ThemeIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-outline-variant">
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-on-surface block leading-tight">{name}</span>
            <span className="text-[10px] font-mono text-outline block">@{handle}</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shadow-inner">
            <img alt="Developer User Profile" className="w-full h-full object-cover" src={userImage} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
