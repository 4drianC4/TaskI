import { BoardView } from "@/components/board/board-view";
import { Sidebar } from "@/components/shared/sidebar";

export default function BoardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Board</h1>
      <div className="grid gap-4 md:grid-cols-[256px_1fr]">
        <Sidebar />
        <BoardView />
      </div>
    </main>
  );
}
