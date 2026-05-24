import { Bookmark } from "lucide-react";
import EmptyState from "../components/EmptyState";
import IssueCard from "../components/IssueCard";
import { useBookmarks } from "../context/BookmarkContext";
import { issues } from "../utils/issues";

function SavedIssues() {
  const { savedIds } = useBookmarks();
  const savedIssues = issues.filter((issue) => savedIds.includes(issue.id));

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-base font-bold text-on-surface flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-primary-core" />
          Saved Issues ({savedIssues.length})
        </h2>
      </div>

      {savedIssues.length === 0 && <EmptyState title="No saved issues" message="Saved issues will appear here." />}

      {savedIssues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedIssues;
