import { TrendingUp } from "lucide-react";

function AnalyticsPanel() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-outline-variant/30">
      <div className="lg:col-span-6 bg-gradient-to-br from-surface-container/30 to-transparent border border-outline-variant p-6 rounded-3xl space-y-4">
        <h3 className="text-xs font-bold text-outline uppercase tracking-wider">Quick Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-dim p-4 rounded-2xl border border-outline-variant hover:border-outline/40 transition-colors">
            <span className="text-[11px] font-semibold text-on-surface-variant block mb-1">Calculated Backlog</span>
            <span className="text-xl sm:text-2xl font-bold font-display text-on-surface block">3,197</span>
            <span className="text-[10px] text-green-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              Live open issues
            </span>
          </div>
          <div className="bg-surface-dim p-4 rounded-2xl border border-outline-variant hover:border-outline/40 transition-colors">
            <span className="text-[11px] font-semibold text-on-surface-variant block mb-1">Catalogs Synced</span>
            <span className="text-xl sm:text-2xl font-bold font-display text-on-surface block">8</span>
            <span className="text-[10px] text-slate-400 mt-1 block font-medium">Stored locally</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 bg-surface-container border border-outline-variant p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <h3 className="text-xs font-bold text-outline uppercase tracking-wider">Language Mix (Interactive)</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">Click on stacks below to quickly filter developer assignments:</p>
          <div className="space-y-2">
            <button className="flex items-center gap-2 text-xs py-1 px-3.5 rounded-full transition-all duration-200 hover:bg-surface-container-high">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>TypeScript (55%)</span>
            </button>
            <button className="flex items-center gap-2 text-xs py-1 px-3.5 rounded-full transition-all duration-200 hover:bg-surface-container-high">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span>JavaScript (30%)</span>
            </button>
            <button className="flex items-center gap-2 text-xs py-1 px-3.5 rounded-full transition-all duration-200 hover:bg-surface-container-high">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Others / Haskell (15%)</span>
            </button>
          </div>
        </div>
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1d1a24" strokeWidth="3.5" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="55 45" strokeDashoffset="0" className="cursor-pointer hover:stroke-[5px] transition-all" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-55" className="cursor-pointer hover:stroke-[5px] transition-all" />
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85" className="cursor-pointer hover:stroke-[5px] transition-all" />
          </svg>
          <div className="absolute text-[10px] font-mono font-bold text-center leading-tight">
            <span className="text-outline block uppercase text-[8px]">Stack</span>
            <span className="text-primary-core uppercase">MIX</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsPanel;
