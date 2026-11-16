import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";
import "./AppLayout.scss";

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__body">
        <header className="app-layout__header">Inventory management</header>
        <main className="app-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
