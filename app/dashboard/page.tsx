import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
  title: "Foodly  ||  Dashboard",
  description: "Welcome to your dashboard",
};

export default function DashboardPage() {
  const isAuthenticated = false;
  const children = isAuthenticated ? <Dashboard /> : <Login />;

  return <Main>{children}</Main>;
}
