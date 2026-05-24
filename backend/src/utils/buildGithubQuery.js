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
  const queryItems = items.map((item) => `${prefix}${quoteIfNeeded(item)}`);
  return `(${queryItems.join(" OR ")})`;
}

function addDifficulty(queryParts, difficulty) {
  const key = cleanValue(difficulty);
  const labels = filterMappings.difficulty[key];

  if (labels) {
    queryParts.push(makeOrGroup(labels, "label:"));
  }
}

function addType(queryParts, type) {
  const key = cleanValue(type);
  const labels = filterMappings.type[key];

  if (labels) {
    queryParts.push(makeOrGroup(labels, "label:"));
  }
}

function addStack(queryParts, stack) {
  const key = cleanValue(stack);
  const keywords = filterMappings.stack[key];

  if (keywords) {
    queryParts.push(makeOrGroup(keywords));
    return;
  }

  if (key) {
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

  if (filters.language) {
    queryParts.push(`language:${cleanValue(filters.language)}`);
  }

  if (filters.repo) {
    queryParts.push(`repo:${filters.repo}`);
  }

  if (filters.beginnerMode === true || filters.beginnerMode === "true") {
    addDifficulty(queryParts, "beginner");
  } else if (filters.difficulty) {
    addDifficulty(queryParts, filters.difficulty);
  }

  if (filters.type) {
    addType(queryParts, filters.type);
  }

  if (filters.tag) {
    addType(queryParts, filters.tag);
  }

  if (filters.stack) {
    addStack(queryParts, filters.stack);
  }

  return queryParts.join(" ");
}

function buildGithubParams(filters = {}) {
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 12;

  // GitHub Search API uses q, page, per_page, sort and order.
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
