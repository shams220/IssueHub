import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isFirstVisitAllowed } = useAuth();

  if (!isLoggedIn && !isFirstVisitAllowed) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default ProtectedRoute;
