const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    githubIssueId: {
      type: String,
      required: true,
    },
    repoName: {
      type: String,
      required: true,
    },
    issueTitle: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    labels: {
      type: [String],
      default: [],
    },
    savedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ githubIssueId: 1, savedBy: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
