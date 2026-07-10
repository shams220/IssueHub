import { LogIn, UserPlus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../services/api";

function AuthPromptModal({ onClose }) {
  function handleGithubLogin() {
    window.location.href = `${API_BASE_URL}/auth/github`;
  }

  function handleGoogleLogin() {
    window.location.href = `${API_BASE_URL}/auth/google`;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-md flex items-center justify-center p-4 auth-modal-backdrop">
      <div className="w-full max-w-sm bg-surface-container border border-outline-variant rounded-3xl shadow-2xl p-5 space-y-5 auth-modal-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-primary-fixed-dim">Create your IssueHub account</h2>
            <p className="text-sm text-on-surface-variant mt-1">Register to open issues on GitHub and keep your progress connected.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <Link to="/register" onClick={onClose} className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold text-sm tracking-wide hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            Register
          </Link>
          <button type="button" onClick={handleGithubLogin} className="w-full py-3 border border-outline-variant text-on-surface rounded-xl font-bold text-sm tracking-wide hover:border-primary-container active:scale-95 transition-all flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" />
            Continue with GitHub
          </button>
          <button type="button" onClick={handleGoogleLogin} className="w-full py-3 border border-outline-variant text-on-surface rounded-xl font-bold text-sm tracking-wide hover:border-primary-container active:scale-95 transition-all flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" />
            Continue with Google
          </button>
        </div>

        <p className="text-xs text-on-surface-variant text-center">
          Already registered?{" "}
          <Link to="/login" onClick={onClose} className="text-primary-core font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthPromptModal;
