function Loader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-surface-container p-5 rounded-2xl border border-outline-variant animate-pulse">
          <div className="h-4 w-32 bg-surface-container-high rounded mb-4" />
          <div className="h-5 w-4/5 bg-surface-container-high rounded mb-3" />
          <div className="h-3 w-full bg-surface-container-high rounded mb-2" />
          <div className="h-3 w-2/3 bg-surface-container-high rounded mb-6" />
          <div className="h-8 w-full bg-surface-container-high rounded" />
        </div>
      ))}
    </div>
  );
}

export default Loader;
