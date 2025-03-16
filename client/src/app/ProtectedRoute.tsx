"use client";
import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "lib/components/LoadingSpinner";
interface PrivateRouteProps {
  component: React.ElementType;
}

const ProtectedRoute = ({ component: Component }: PrivateRouteProps) => {
  const { data: session, status } = useSession();

  if (!session && status !== "loading") {
    redirect("/login", RedirectType.replace);
  }

  if (status == "loading") {
    return <LoadingSpinner />;
  }

  return <Component />;
};

export default ProtectedRoute;
