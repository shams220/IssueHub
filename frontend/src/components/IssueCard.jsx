import { Activity, Bookmark, Database, MessageSquare, Star, Terminal } from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext";

const iconMap = {
  activity: Activity,
  database: Database,
  terminal: Terminal,
};

const difficultyClass = {
  Easy: "bg-green-950/40 text-green-400 border border-green-500/30",
  Medium: "bg-amber-950/40 text-amber-400 border border-amber-500/30",
  Hard: "bg-rose-950/40 text-rose-400 border border-rose-500/30",
};

function IssueCard({ issue, onOpen = () => {} }) {
  const { savedIds, toggleBookmark } = useBookmarks();
  const Icon = iconMap[issue.icon] || Terminal;
  const isSaved = savedIds.includes(issue.id);
  const repoName = issue.repoName || issue.repo;
  const comments = issue.commentsCount || issue.comments || 0;
  const time = issue.time || "GitHub";

  return (
    <div onClick={() => onOpen(issue)} id={`issue-card-${issue.id}`} className="bg-surface-container p-5 rounded-2xl border border-outline-variant hover:border-primary-container/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer group transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-on-background/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary-core" />
            </div>
            <span className="text-xs font-medium text-on-surface-variant group-hover:text-primary-container transition-colors duration-200">{repoName}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-outline mr-2">{time}</span>
            <button onClick={(event) => {
              event.stopPropagation();
              toggleBookmark(issue.id);
            }} className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary-container transition-colors" title={isSaved ? "Remove Bookmark" : "Save Bookmark"}>
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-primary-container text-primary-container" : "text-outline hover:text-on-surface"}`} />
            </button>
          </div>
        </div>

        <h3 className="font-display text-base font-semibold text-on-surface group-hover:text-primary-container transition-colors duration-300 leading-snug mb-2">{issue.title}</h3>
        <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">{issue.description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-outline-variant/50">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${difficultyClass[issue.difficulty]}`}>{issue.difficulty}</span>
          <span className="text-xs text-on-surface-variant flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {issue.language}
          </span>
        </div>

        <div className="flex items-center gap-3 text-outline">
          <div className="flex items-center gap-1 text-xs" title="Comments count">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center gap-1 text-xs" title="GitHub Stars">
            <Star className="w-3.5 h-3.5" />
            <span>{issue.stars}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
