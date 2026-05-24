const githubService = require("../services/githubService");
const asyncHandler = require("../utils/asyncHandler");
const normalizeFilters = require("../utils/normalizeFilters");

function sendIssueList(res, result) {
  const message = result.issues.length === 0 ? "No issues found" : "Issues fetched successfully";

  res.status(200).json({
    success: true,
    message,
    issues: result.issues,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
    githubQuery: result.query,
    sort: result.sort,
  });
}

const getIssues = asyncHandler(async (req, res) => {
  const filters = normalizeFilters(req.query);
  const result = await githubService.searchIssues(filters);

  sendIssueList(res, result);
});

const getTrendingIssues = asyncHandler(async (req, res) => {
  const result = await githubService.getTrendingIssues();

  sendIssueList(res, result);
});

const getIssueById = asyncHandler(async (req, res) => {
  const repo = req.query.repo;
  const issueNumber = req.params.id;

  if (!repo) {
    res.status(400);
    throw new Error("Repo is required. Example: /api/issues/12?repo=facebook/react");
  }

  const issue = await githubService.getIssueById(repo, issueNumber);

  res.status(200).json({
    success: true,
    message: "Issue fetched successfully",
    issue,
  });
});

module.exports = {
  getIssues,
  getTrendingIssues,
  getIssueById,
};
