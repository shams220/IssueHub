function cleanText(value) {
  return String(value || "").trim();
}

function cleanLower(value) {
  return cleanText(value).toLowerCase();
}

function normalizeDifficulty(value) {
  const difficulty = cleanLower(value);

  if (difficulty === "easy") {
    return "beginner";
  }

  if (difficulty === "medium") {
    return "intermediate";
  }

  if (difficulty === "hard") {
    return "advanced";
  }

  return difficulty;
}

function normalizeFilters(query = {}) {
  return {
    search: cleanText(query.search),
    language: cleanLower(query.language || query.stackLanguage),
    stack: cleanLower(query.stack),
    difficulty: normalizeDifficulty(query.difficulty),
    type: cleanLower(query.type || query.tag || query.scopeTag),
    repo: cleanText(query.repo),
    beginnerMode: query.beginnerMode === true || query.beginnerMode === "true",
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 12,
    sort: cleanLower(query.sort || "updated"),
    order: cleanLower(query.order || "desc"),
  };
}

module.exports = normalizeFilters;
