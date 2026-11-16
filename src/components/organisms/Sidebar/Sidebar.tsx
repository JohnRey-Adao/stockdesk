import { NavLink } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import type { Role } from "@/features/auth/schema";
import "./Sidebar.scss";

interface NavItem {
  to: string;
  label: string;
  end: boolean;
  roles?: Role[];
}

const links: NavItem[] = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/products", label: "Products", end: false },
  { to: "/orders", label: "Orders", end: false },
  { to: "/users", label: "Users", end: false, roles: ["admin"] },
];

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  const { user } = useAuth();

  const visibleLinks = links.filter(
    (link) => !link.roles || (user !== null && link.roles.includes(user.role)),
  );

  return (
    <aside id="sidebar" className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
      <div className="sidebar__brand">StockDesk</div>
      <nav aria-label="Main navigation">
        <ul className="sidebar__list">
          {visibleLinks.map(({ to, label, end }) => (
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
