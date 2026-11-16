import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/products", label: "Products", end: false },
  { to: "/orders", label: "Orders", end: false },
  { to: "/users", label: "Users", end: false },
];

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  return (
    <aside id="sidebar" className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
      <div className="sidebar__brand">StockDesk</div>
      <nav aria-label="Main navigation">
        <ul className="sidebar__list">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `sidebar__link${isActive ? " sidebar__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
