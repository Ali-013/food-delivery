import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export const metadata = {
  title: "Foodly  ||  Dashboard",
  description: "Welcome to your dashboard",
};

export default function DashboardPage() {
  const isAuthenticated = false;
  const children = isAuthenticated ? <Dashboard /> : <Login />;

  return <h1>{children}</h1>;
}
