import { useAppSelector } from "data/api/services/hooks";
import React from "react";
import { selectIsLoggedIn } from "./slices/authSlice";
import { useRouter } from "next/navigation";
interface PrivateRouteProps {
  component: React.ElementType;
  permissoes: string[];
}

const ProtectedRoute = ({ component: Component }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/login");
  }

  return <Component />;
};

export default ProtectedRoute;
