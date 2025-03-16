import DashboardPage from "./Dashboard";
import ProtectedRoute from "app/ProtectedRoute";

export default function Dashboard() {
  return <ProtectedRoute component={DashboardPage} />;
}
