import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const { completeOAuthLogin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;

    const error = searchParams.get("error");
    const accessToken = searchParams.get("accessToken");
    const encodedUser = searchParams.get("user");

    if (error) {
      processed.current = true;
      toast.error(error);
      navigate("/login", { replace: true });
      return;
    }

    if (!accessToken || !encodedUser) {
      processed.current = true;
      toast.error("OAuth login failed");
      navigate("/login", { replace: true });
      return;
    }

    try {
      processed.current = true;
      const user = JSON.parse(decodeURIComponent(encodedUser));
      completeOAuthLogin(user, accessToken);
    } catch {
      processed.current = true;
      toast.error("OAuth login failed");
      navigate("/login", { replace: true });
    }
  }, [completeOAuthLogin, navigate, searchParams]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/explore", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center p-4 font-sans">
      <p className="text-sm font-bold text-on-surface-variant">Finishing sign in...</p>
    </div>
  );
}

export default OAuthCallback;
