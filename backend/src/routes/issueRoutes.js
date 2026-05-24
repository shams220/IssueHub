const express = require("express");
const {
  getIssues,
  getTrendingIssues,
  getIssueById,
} = require("../controllers/issueController");

const router = express.Router();

router.get("/", getIssues);
router.get("/trending", getTrendingIssues);
router.get("/:id", getIssueById);

module.exports = router;
