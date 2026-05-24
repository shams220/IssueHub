import { Plus } from "lucide-react";

function FloatingButton() {
  return (
    <button title="Catalog custom issue" className="fixed bottom-20 md:bottom-8 right-6 z-40 w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-2xl shadow-primary-container/30 active:scale-90 transition-transform cursor-pointer">
      <Plus className="w-6 h-6 shrink-0" />
    </button>
  );
}

export default FloatingButton;
