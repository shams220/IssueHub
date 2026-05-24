function EmptyState({ title = "No issues found", message = "Try changing filters or search text." }) {
  return (
    <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant text-center">
      <h3 className="font-display text-base font-bold text-on-surface">{title}</h3>
      <p className="text-xs text-on-surface-variant mt-2">{message}</p>
    </div>
  );
}

export default EmptyState;
