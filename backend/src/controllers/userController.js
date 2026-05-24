const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      savedIssues: req.user.savedIssues,
    },
  });
});

module.exports = {
  getProfile,
};
