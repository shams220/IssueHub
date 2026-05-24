import { useMemo, useState } from "react";
import { CodeXml } from "lucide-react";
import AnalyticsPanel from "../components/AnalyticsPanel";
import EmptyState from "../components/EmptyState";
import FeaturedRepository from "../components/FeaturedRepository";
import FilterSidebar from "../components/FilterSidebar";
import IssueCard from "../components/IssueCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useFilters } from "../context/FilterContext";
import { issues } from "../utils/issues";

function ExploreIssues() {
  const [loading] = useState(false);
  const [page, setPage] = useState(1);
  const { search, stack, difficulty, beginnerMode } = useFilters();
  const perPage = 6;

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const searchText = `${issue.repo} ${issue.title} ${issue.description}`.toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesStack = stack === "All" || issue.language === stack;
      const matchesDifficulty = difficulty === "All" || issue.difficulty === difficulty;
      const matchesBeginner = !beginnerMode || issue.difficulty === "Easy";

      return matchesSearch && matchesStack && matchesDifficulty && matchesBeginner;
    });
  }, [search, stack, difficulty, beginnerMode]);

  const totalPages = Math.max(1, Math.ceil(filteredIssues.length / perPage));
  const start = (page - 1) * perPage;
  const visibleIssues = filteredIssues.slice(start, start + perPage);

  return (
    <div className="space-y-6">
      <FilterSidebar />
      <FeaturedRepository />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <CodeXml className="w-4 h-4 text-primary-core" />
            Curated Open-Source Issues ({filteredIssues.length})
          </h2>
        </div>

        {loading && <Loader />}

        {!loading && visibleIssues.length === 0 && <EmptyState />}

        {!loading && visibleIssues.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </>
        )}
      </section>

      <AnalyticsPanel />
    </div>
  );
}

export default ExploreIssues;
