import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";
import "./AppLayout.scss";

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <div className="app-layout">
      <Sidebar isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />

      {menuOpen && (
        <div
          className="app-layout__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="app-layout__body">
        <header className="app-layout__header">
          <Button
            variant="ghost"
            size="sm"
            className="app-layout__menu-button"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </Button>
          <span>Inventory management</span>
        </header>
        <main className="app-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
