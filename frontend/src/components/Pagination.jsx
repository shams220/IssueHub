function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-xs font-bold text-on-surface disabled:opacity-40">
        Previous
      </button>
      <span className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold">
        {page} / {totalPages}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-xs font-bold text-on-surface disabled:opacity-40">
        Next
      </button>
    </div>
  );
}

export default Pagination;
