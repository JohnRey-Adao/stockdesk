import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/organisms/AppLayout/AppLayout";
import { RequireAuth, RequireRole } from "@/features/auth/guards";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { UsersPage } from "@/pages/UsersPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "orders", element: <OrdersPage /> },
          {
            element: <RequireRole allow={["admin"]} />,
            children: [{ path: "users", element: <UsersPage /> }],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
