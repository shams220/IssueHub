const express = require("express");
const { explainIssue } = require("../controllers/aiController");

const router = express.Router();

router.post("/explain-issue", explainIssue);

module.exports = router;
