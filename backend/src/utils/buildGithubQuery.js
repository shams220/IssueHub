const filterMappings = require("./filterMappings");

function cleanValue(value) {
  return String(value || "").trim().toLowerCase();
}

function quoteIfNeeded(value) {
  if (value.includes(" ") || value.includes("/")) {
    return `"${value}"`;
  }

  return value;
}

function makeOrGroup(items, prefix = "") {
  if (!items || items.length === 0) return "";
  
  const queryItems = items.map((item) => `${prefix}${quoteIfNeeded(item)}`);
  
  if (queryItems.length === 1) {
    return queryItems[0];
  }
  
  return `(${queryItems.join(" OR ")})`;
}

function addDifficulty(queryParts, difficulty) {
  const key = cleanValue(difficulty);
  if (key === "all") return;

  const labels = filterMappings.difficulty[key];
  if (labels) {
    queryParts.push(makeOrGroup(labels));
  } else {
    queryParts.push(quoteIfNeeded(key));
  }
}

function addType(queryParts, type) {
  const key = cleanValue(type);
  if (key === "all") return;

  const labels = filterMappings.type[key];
  if (labels) {
    queryParts.push(makeOrGroup(labels));
  } else {
    queryParts.push(quoteIfNeeded(key));
  }
}

function addStack(queryParts, stack) {
  const key = cleanValue(stack);
  if (key === "all") return;

  const keywords = filterMappings.stack[key];
  if (keywords) {
    queryParts.push(makeOrGroup(keywords));
  } else if (key) {
    queryParts.push(key);
  }
}

function getGithubSort(sort) {
  const key = cleanValue(sort);
  return filterMappings.sort[key] || "updated";
}

function buildGithubQuery(filters = {}) {
  const queryParts = ["is:issue", "is:open"];

  if (filters.search) {
    queryParts.push(filters.search);
  }

  if (filters.language && cleanValue(filters.language) !== "all") {
    queryParts.push(`language:${cleanValue(filters.language)}`);
  }

  if (filters.repo) {
    queryParts.push(`repo:${filters.repo}`);
  }

  // Beginner mode overrides and excludes other difficulties
  if (filters.beginnerMode === true || filters.beginnerMode === "true") {
    addDifficulty(queryParts, "beginner");
    // Explicitly exclude common medium/hard labels to be strict
    queryParts.push("-label:medium", "-label:intermediate", "-label:hard", "-label:advanced", "-label:complex");
  } else if (filters.difficulty) {
    addDifficulty(queryParts, filters.difficulty);
  }

  // Use 'type' as the primary filter for scope/tags
  const typeValue = filters.type || filters.tag;
  if (typeValue) {
    addType(queryParts, typeValue);
  }

  if (filters.stack) {
    addStack(queryParts, filters.stack);
  }

  return queryParts.join(" ");
}

function buildGithubParams(filters = {}) {
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 12;

  return {
    q: buildGithubQuery(filters),
    page,
    per_page: limit,
    sort: getGithubSort(filters.sort),
    order: filters.order || "desc",
  };
}

module.exports = buildGithubQuery;
module.exports.buildGithubParams = buildGithubParams;
