import { SessionProvider } from "next-auth/react";
import RegsiterForm from "./RegisterForm";

export default function Regsiter() {
  return (
    <SessionProvider>
      <RegsiterForm />
    </SessionProvider>
  );
}
