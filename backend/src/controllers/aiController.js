const asyncHandler = require("../utils/asyncHandler");

/**
 * @desc    Explain issue using AI
 * @route   POST /api/ai/explain-issue
 * @access  Public (or Private depending on your auth)
 */
const explainIssue = asyncHandler(async (req, res) => {
  const { title, body, labels, repo } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Issue title is required");
  }

  // Simulate AI Processing Delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // For a real implementation, you would call OpenAI, Anthropic, or Google Gemini API here.
  // We'll return a structured mock response as per the UI requirements.
  
  const aiResponse = {
    summary: `This issue in ${repo || "the repository"} involves "${title}". It appears to be related to ${labels?.join(", ") || "general maintenance"}.`,
    explanation: `The issue description suggests a need to address ${title.toLowerCase()}. In beginner terms, this means making specific changes to the codebase to improve functionality or fix a bug that was reported.`,
    whyThisHappens: "This typically occurs when certain edge cases are not handled in the current logic, or when a new feature requirement necessitates a refactor of existing components.",
    steps: [
      `Analyze the current implementation of the feature related to "${title}".`,
      "Locate the relevant files and components mentioned in the issue description.",
      "Implement the requested changes or fixes while ensuring existing tests pass.",
      "Verify the fix by testing edge cases and submitting a pull request.",
    ],
    hints: [
      "Check the documentation for the components involved.",
      "Look for similar implementations in the codebase for guidance.",
      "Don't hesitate to ask for clarification on the GitHub issue if needed.",
    ],
    difficulty: labels?.some(l => l.toLowerCase().includes('hard')) ? "Hard" : 
                labels?.some(l => l.toLowerCase().includes('medium')) ? "Medium" : "Easy",
    recommendedKnowledge: [
      "JavaScript/TypeScript Fundamentals",
      "Git & GitHub Workflow",
      "Project-specific testing frameworks",
    ],
  };

  res.status(200).json({
    success: true,
    data: aiResponse,
  });
});

module.exports = {
  explainIssue,
};
