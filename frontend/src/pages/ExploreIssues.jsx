import { useEffect, useState } from "react";
import { CodeXml } from "lucide-react";
import toast from "react-hot-toast";
import AnalyticsPanel from "../components/AnalyticsPanel";
import EmptyState from "../components/EmptyState";
import FeaturedRepository from "../components/FeaturedRepository";
import FilterSidebar from "../components/FilterSidebar";
import IssueCard from "../components/IssueCard";
import IssueModal from "../components/IssueModal";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useFilters } from "../context/FilterContext";
import api from "../services/api";

function ExploreIssues() {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { search, stack, difficulty, tag, beginnerMode } = useFilters();
  const limit = 6;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    setPage(1);
  }, [search, stack, difficulty, tag, beginnerMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIssues();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, stack, difficulty, tag, beginnerMode, page]);

  async function fetchIssues() {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        search,
        beginnerMode,
      };

      if (stack !== "All") {
        params.language = stack.toLowerCase();
      }

      if (difficulty !== "All") {
        params.difficulty = difficulty.toLowerCase();
      }

      if (tag !== "All") {
        params.type = tag;
      }

      const response = await api.get("/issues", { params });

      setIssues(response.data.issues || []);
      setTotal(response.data.pagination?.total || 0);
    } catch (error) {
      setIssues([]);
      setTotal(0);
      toast.error(error.response?.data?.message || "Could not fetch GitHub issues");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <FilterSidebar />
      <FeaturedRepository />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <CodeXml className="w-4 h-4 text-primary-core" />
            Curated Open-Source Issues ({total})
          </h2>
        </div>

        {loading && <Loader />}

        {!loading && issues.length === 0 && <EmptyState />}

        {!loading && issues.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} onOpen={setSelectedIssue} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </>
        )}
      </section>

      <AnalyticsPanel />
      <IssueModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
    </div>
  );
}

export default ExploreIssues;
