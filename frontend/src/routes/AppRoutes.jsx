import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import ExploreIssues from "../pages/ExploreIssues";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OAuthCallback from "../pages/OAuthCallback";
import Register from "../pages/Register";
import SavedIssues from "../pages/SavedIssues";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/callback" element={<OAuthCallback />} />

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreIssues />} />
        <Route path="/saved" element={<SavedIssues />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
