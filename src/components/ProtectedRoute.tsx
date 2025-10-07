import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loading: adminLoading, user: adminUser } = useSelector((state: RootState) => state.login.admin);
  const { loading: sellerLoading, user: sellerUser } = useSelector((state: RootState) => state.login.seller);

  // Determine which user to check based on required role
  const isLoading = adminLoading || sellerLoading;
  const currentUser = adminUser || sellerUser;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>
}