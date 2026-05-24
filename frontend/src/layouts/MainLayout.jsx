import { Outlet } from "react-router-dom";
import FloatingButton from "../components/FloatingButton";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-container selection:text-white">
      <div className="flex flex-1 relative">
        <Sidebar />

        <div className="flex-1 md:ml-64 flex flex-col min-w-0 pb-20 md:pb-6">
          <Navbar />
          <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileNav />
      <FloatingButton />
    </div>
  );
}

export default MainLayout;
