function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  next();
}

function validateBookmark(req, res, next) {
  const { githubIssueId, repoName, issueTitle, githubUrl } = req.body;

  if (!githubIssueId || !repoName || !issueTitle || !githubUrl) {
    res.status(400);
    throw new Error("Issue id, repo name, title and url are required");
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateBookmark,
};
