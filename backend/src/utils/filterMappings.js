const filterMappings = {
  difficulty: {
    beginner: ["good first issue", "easy", "beginner", "starter", "newbie"],
    easy: ["good first issue", "easy", "beginner", "starter", "newbie"],
    intermediate: ["medium", "intermediate", "normal"],
    medium: ["medium", "intermediate", "normal"],
    advanced: ["hard", "expert", "complex", "advanced"],
    hard: ["hard", "expert", "complex", "advanced"],
  },
  type: {
    bug: ["bug", "kind/bug", "defect"],
    feature: ["enhancement", "feature", "feature-request"],
    enhancement: ["enhancement", "feature", "feature-request"],
    frontend: ["frontend", "ui", "client"],
    "ui/ux": ["frontend", "ui", "client", "ui/ux"],
    backend: ["backend", "server", "api"],
    performance: ["performance", "optimization", "perf"],
    refactor: ["refactor", "cleanup", "code-quality"],
    runtime: ["runtime", "core"],
    sql: ["sql", "database", "db"],
  },
  stack: {
    frontend: ["frontend", "ui", "client"],
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
