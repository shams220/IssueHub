import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { claimFirstVisit, isFirstVisitAllowed, isLoggedIn } = useAuth();

  if (!isLoggedIn && !isFirstVisitAllowed && !claimFirstVisit()) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default ProtectedRoute;
