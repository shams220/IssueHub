import { useFilters } from "../context/FilterContext";

const imageUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDIApiTQEY5QYrgl9XJEZKTq6wTn5oJlfHY7aYiynmF3L_WnHVcDcAthsZGLOxSzWcf_M5Cgw9IFJZe38eZLG22zKNgt8n8FiYdhq_1Qw4txT0Arcwzbga6aBIGOX0lrnjAGVXj5-zbASS8mHbskZDAjPBZ9z9jkUTfAh5BLo29obtXb58gP_LEX9HyU8CFuUUnp7luZuSAn5G7VErgVYrUUhuHr75SVQCWiXugzEF79KM5HJcPa9io7VR0VWD2mrGRQNthoq8a70g";

function FeaturedRepository() {
  const { setSearch, setStack, setTag } = useFilters();

  const handleViewIssues = () => {
    setSearch("alpha");
    setStack("All");
    setTag("All");
  };

  return (
    <section className="relative w-full rounded-3xl overflow-hidden min-h-[180px] flex items-end p-6 border border-outline-variant bg-surface-container shadow-inner">
      <img alt="Digital node code glowing graphic" className="absolute inset-0 w-full h-full object-cover opacity-35" src={imageUrl} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-bold font-mono tracking-widest text-primary-core uppercase px-2 py-0.5 bg-primary-container/20 rounded-md border border-primary-container/30">Featured Repository</span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1.5 leading-snug">Tailwind Labs / HeadlessUI</h2>
          <p className="text-xs text-on-surface-variant max-w-md mt-1">View active styling guidelines and participate in crafting accessible widgets.</p>
        </div>
        <button
          onClick={handleViewIssues}
          className="bg-white text-background font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-on-surface-variant transition-colors active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          View Alpha Issues
        </button>
      </div>
    </section>
  );
}

export default FeaturedRepository;
