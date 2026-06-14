import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  // Goal for the week
  const [goal] = useState(3);
  
  // Track IDs of issues marked as solved
  const [solvedIssueIds, setSolvedIssueIds] = useState(() => {
    const saved = localStorage.getItem("solvedIssues");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("solvedIssues", JSON.stringify(solvedIssueIds));
  }, [solvedIssueIds]);

  const toggleSolved = (issueId) => {
    setSolvedIssueIds((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const completedCount = solvedIssueIds.length;
  const progressPercentage = Math.min(100, (completedCount / goal) * 100);

  const value = {
    goal,
    solvedIssueIds,
    completedCount,
    progressPercentage,
    toggleSolved,
    isSolved: (id) => solvedIssueIds.includes(id),
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  return useContext(ProgressContext);
}
