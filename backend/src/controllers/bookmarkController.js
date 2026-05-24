const Bookmark = require("../models/Bookmark");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const createBookmark = asyncHandler(async (req, res) => {
  const { githubIssueId, repoName, issueTitle, githubUrl, labels } = req.body;

  const existingBookmark = await Bookmark.findOne({
    githubIssueId,
    savedBy: req.user._id,
  });

  if (existingBookmark) {
    res.status(400);
    throw new Error("Issue already bookmarked");
  }

  const bookmark = await Bookmark.create({
    githubIssueId,
    repoName,
    issueTitle,
    githubUrl,
    labels: labels || [],
    savedBy: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { savedIssues: bookmark._id },
  });

  res.status(201).json({
    success: true,
    message: "Bookmark saved successfully",
    data: bookmark,
  });
});

const getBookmarks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Bookmark.countDocuments({ savedBy: req.user._id });
  const bookmarks = await Bookmark.find({ savedBy: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    message: "Bookmarks fetched successfully",
    data: bookmarks,
    pagination: {
      page,
      limit,
      total,
    },
  });
});

const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOne({
    _id: req.params.id,
    savedBy: req.user._id,
  });

  if (!bookmark) {
    res.status(404);
    throw new Error("Bookmark not found");
  }

  await Bookmark.deleteOne({ _id: bookmark._id });

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { savedIssues: bookmark._id },
  });

  res.status(200).json({
    success: true,
    message: "Bookmark removed successfully",
  });
});

module.exports = {
  createBookmark,
  getBookmarks,
  deleteBookmark,
};
