import { SessionProvider } from "next-auth/react";
import DashboardPage from "./Dashboard";

export default function Dashboard() {
  return (
    <SessionProvider>
      <DashboardPage />
    </SessionProvider>
  );
}
