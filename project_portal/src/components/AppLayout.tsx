import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
      <Sidebar />
      <div className="min-w-0">
        <TopBar />
        <main className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
