import AppRoutes from "./routes/AppRoutes";
import { usePageTracking } from "./hooks/usePageTracking";

function App() {
  usePageTracking();

  return <AppRoutes />;
}

export default App;
