import { ExternalLink, MessageSquare, Star, X } from "lucide-react";

function IssueModal({ issue, onClose }) {
  if (!issue) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container border border-outline-variant rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 p-5 border-b border-outline-variant">
          <div>
            <span className="text-xs font-medium text-primary-core">{issue.repoName || issue.repo}</span>
            <h2 className="font-display text-lg font-bold text-on-surface mt-1 leading-snug">{issue.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-on-surface-variant leading-relaxed max-h-48 overflow-y-auto">
            {issue.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-2">
            {(issue.labels || []).map((label) => (
              <span key={label} className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-surface-dim text-on-surface-variant border border-outline-variant">
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/50">
            <div className="flex items-center gap-4 text-outline">
              <span className="flex items-center gap-1 text-xs">
                <MessageSquare className="w-3.5 h-3.5" />
                {issue.commentsCount || issue.comments || 0}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5" />
                {issue.stars || 0}
              </span>
            </div>

            <a href={issue.githubUrl} target="_blank" rel="noreferrer" className="bg-primary-container text-on-primary-container font-bold px-5 py-2.5 rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2">
              Open on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueModal;
