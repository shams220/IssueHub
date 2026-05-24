import AnalyticsPanel from "../components/AnalyticsPanel";

function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="bg-surface-container rounded-3xl p-6 border border-outline-variant shadow-sm">
        <h2 className="font-display text-base font-bold text-on-surface">Settings & Profile</h2>
        <p className="text-xs text-on-surface-variant mt-2">Dashboard data will connect with backend APIs later.</p>
      </section>
      <AnalyticsPanel />
    </div>
  );
}

export default Dashboard;
