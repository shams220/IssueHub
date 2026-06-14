import { useState, useEffect } from "react";
import { ExternalLink, MessageSquare, Star, X, Sparkles, Loader2, CheckCircle2, Lightbulb, GraduationCap, AlertCircle, ChevronDown, ChevronUp, Check } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useProgress } from "../context/ProgressContext";

function IssueModal({ issue, onClose }) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const { toggleSolved, isSolved } = useProgress();

  const solved = issue ? isSolved(issue.id) : false;

  // Reset state when the issue changes or modal closes
  useEffect(() => {
    if (!issue) {
      setAiResponse(null);
      setAiLoading(false);
      setShowAI(false);
    }
  }, [issue]);

  if (!issue) {
    return null;
  }

  const handleAskAI = async () => {
    // If we already have a response, just toggle visibility
    if (aiResponse) {
      setShowAI(!showAI);
      return;
    }

    try {
      setAiLoading(true);
      const response = await api.post("/ai/explain-issue", {
        title: issue.title,
        body: issue.description,
        labels: issue.labels,
        repo: issue.repoName || issue.repo,
      });
      setAiResponse(response.data.data);
      setShowAI(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get AI assistance");
    } finally {
      setAiLoading(false);
    }
  };

  const handleClose = () => {
    // Reset local state before closing
    setAiResponse(null);
    setAiLoading(false);
    setShowAI(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container border border-outline-variant rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Fixed Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-outline-variant shrink-0 bg-surface-container/50 backdrop-blur-md z-10">
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-primary-core truncate block">
              {issue.repoName || issue.repo}
            </span>
            <h2 className="font-display text-lg font-bold text-on-surface mt-1 leading-snug truncate">
              {issue.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          <div className="space-y-6">
            {/* Issue Description */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold text-outline tracking-widest uppercase">Issue Description</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {issue.description || "No description available."}
              </p>
            </div>

            {/* AI Explanation Section (Accordion) */}
            {aiResponse && showAI && (
              <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
                <div className="h-px bg-outline-variant/50 w-full" />
                
                <div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary-fixed-dim">
                      <Sparkles className="w-4 h-4" />
                      <h3 className="text-sm font-bold">AI Beginner Breakdown</h3>
                    </div>
                    <button 
                      onClick={() => setShowAI(false)}
                      className="text-[10px] font-bold text-outline-variant hover:text-on-surface transition-colors flex items-center gap-1"
                    >
                      <ChevronUp className="w-3 h-3" />
                      HIDE
                    </button>
                  </div>

                  {/* Simple Explanation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      Simple Explanation
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed pl-5">
                      {aiResponse.summary}
                    </p>
                  </div>

                  {/* Why This Happens */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      Why This Happens
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed pl-5">
                      {aiResponse.whyThisHappens}
                    </p>
                  </div>

                  {/* Steps to Solve */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
                      Steps To Solve
                    </div>
                    <ol className="space-y-1.5 pl-5">
                      {aiResponse.steps.map((step, idx) => (
                        <li key={idx} className="text-xs text-on-surface-variant leading-relaxed flex gap-2">
                          <span className="font-mono text-primary-core/70 font-bold">{idx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Helpful Hints */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Helpful Hints
                    </div>
                    <ul className="space-y-1.5 pl-5">
                      {aiResponse.hints.map((hint, idx) => (
                        <li key={idx} className="text-xs text-on-surface-variant leading-relaxed flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-outline-variant shrink-0" />
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-outline uppercase">AI Difficulty</span>
                      <div className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        aiResponse.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                        aiResponse.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {aiResponse.difficulty}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-outline uppercase">Recommended Knowledge</span>
                      <div className="flex flex-wrap gap-2">
                        {aiResponse.recommendedKnowledge.map((k) => (
                          <span key={k} className="flex items-center gap-1 text-[10px] text-on-surface-variant bg-surface-dim px-2 py-0.5 rounded border border-outline-variant/30">
                            <GraduationCap className="w-3 h-3" />
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Labels */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(issue.labels || []).map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-surface-dim text-on-surface-variant border border-outline-variant"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-5 border-t border-outline-variant bg-surface-container shrink-0 z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-outline">
              <span className="flex items-center gap-1.5 text-xs font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                {issue.commentsCount || issue.comments || 0}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium">
                <Star className="w-3.5 h-3.5" />
                {issue.stars || 0}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toggleSolved(issue.id);
                  if (!solved) {
                    toast.success("Task marked as solved! Progress updated.");
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  solved 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                    : "bg-surface-dim text-on-surface-variant border border-outline-variant hover:text-on-surface"
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  solved ? "bg-green-500 border-green-500" : "border-outline-variant"
                }`}>
                  {solved && <Check className="w-3 h-3 text-white" />}
                </div>
                Solved
              </button>

              <button
                onClick={handleAskAI}
                disabled={aiLoading}
                className={`font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all active:scale-95 ${
                  showAI
                    ? "bg-surface-dim text-on-surface border border-outline-variant hover:bg-surface-container-high"
                    : "bg-gradient-to-r from-purple-600 to-primary-core text-white shadow-lg shadow-purple-500/20 hover:brightness-110"
                }`}
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : aiResponse && showAI ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide AI
                  </>
                ) : aiResponse && !showAI ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show AI
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Ask AI
                  </>
                )}
              </button>
              
              <a
                href={issue.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-primary-container text-on-primary-container font-bold px-5 py-2.5 rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                Open on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueModal;
