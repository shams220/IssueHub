const filterMappings = {
  difficulty: {
    beginner: ["good first issue", "easy", "beginner"],
    easy: ["good first issue", "easy", "beginner"],
    intermediate: ["medium", "intermediate"],
    medium: ["medium", "intermediate"],
    advanced: ["hard", "advanced", "complex"],
    hard: ["hard", "advanced", "complex"],
  },
  type: {
    bug: ["bug", "defect"],
    feature: ["enhancement", "feature"],
    enhancement: ["enhancement", "feature"],
    frontend: ["frontend", "ui"],
    "ui/ux": ["ui", "ux", "frontend"],
    backend: ["backend", "api", "server"],
    performance: ["performance", "perf"],
    refactor: ["refactor", "cleanup"],
    runtime: ["runtime", "core"],
    sql: ["sql", "database"],
    core: ["core"],
    edge: ["edge"],
    "good first issue": ["good first issue"],
  },
  stack: {

    react: ["react"],
    javascript: ["javascript"],
    typescript: ["typescript"],
    python: ["python"],
    rust: ["rust"],
    haskell: ["haskell"],
    node: ["node", "express"],
  },
  sort: {
    newest: "created",
    comments: "comments",
    updated: "updated",
  },
};

module.exports = filterMappings;
