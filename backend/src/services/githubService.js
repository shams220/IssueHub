const axios = require("axios");
const { buildGithubParams } = require("../utils/buildGithubQuery");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

githubApi.interceptors.request.use((config) => {
  if (process.env.GITHUB_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return config;
});

function getRepoName(issue) {
  return issue.repository_url.replace("https://api.github.com/repos/", "");
}

function getDifficulty(labels) {
  const labelText = labels.join(" ").toLowerCase();

  if (labelText.includes("good first issue") || labelText.includes("easy") || labelText.includes("beginner")) {
    return "Easy";
  }

  if (labelText.includes("hard") || labelText.includes("expert") || labelText.includes("complex")) {
    return "Hard";
  }

  return "Medium";
}

function getLanguageFromUrl(issue) {
  if (issue.language) {
    return issue.language;
  }

  return "";
}

function cleanIssue(issue) {
  const labels = issue.labels.map((label) => label.name);

  return {
    id: String(issue.id),
    title: issue.title,
    description: issue.body || "",
    labels,
    repoName: getRepoName(issue),
    githubUrl: issue.html_url,
    commentsCount: issue.comments,
    stars: 0,
    createdAt: issue.created_at,
    language: getLanguageFromUrl(issue),
    difficulty: getDifficulty(labels),
    bookmarked: false,
  };
}

function handleGithubError(error) {
  if (error.response && error.response.status === 403) {
    const message = error.response.data.message || "";

    if (message.toLowerCase().includes("rate limit")) {
      const rateLimitError = new Error("GitHub API rate limit exceeded");
      rateLimitError.statusCode = 429;
      throw rateLimitError;
    }
  }

  throw error;
}

async function searchIssues(filters) {
  try {
    const params = buildGithubParams(filters);
    const response = await githubApi.get("/search/issues", { params });
    const issues = response.data.items.map(cleanIssue);

    return {
      issues,
      total: response.data.total_count,
      page: params.page,
      limit: params.per_page,
      query: params.q,
      sort: params.sort,
    };
  } catch (error) {
    handleGithubError(error);
  }
}

async function getIssueById(repo, issueNumber) {
  try {
    const response = await githubApi.get(`/repos/${repo}/issues/${issueNumber}`);
    const issue = cleanIssue(response.data);

    issue.repoName = repo;
    issue.description = response.data.body || "";

    return issue;
  } catch (error) {
    handleGithubError(error);
  }
}

async function getTrendingIssues() {
  return searchIssues({
    difficulty: "beginner",
    sort: "comments",
    limit: 12,
  });
}

module.exports = {
  searchIssues,
  getIssueById,
  getTrendingIssues,
};
