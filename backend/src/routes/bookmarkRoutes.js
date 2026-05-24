const express = require("express");
const {
  createBookmark,
  deleteBookmark,
  getBookmarks,
} = require("../controllers/bookmarkController");
const protect = require("../middleware/authMiddleware");
const { validateBookmark } = require("../middleware/validateMiddleware");

const router = express.Router();

router.post("/", protect, validateBookmark, createBookmark);
router.get("/", protect, getBookmarks);
router.delete("/:id", protect, deleteBookmark);

module.exports = router;
