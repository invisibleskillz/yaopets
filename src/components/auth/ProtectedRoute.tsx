import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // Check if just redirected after login
    const isLoginRedirect = sessionStorage.getItem("isRedirectingAfterLogin") === "true";
    const loginTimestamp = sessionStorage.getItem("loginTimestamp");
    const isRecentLogin =
      loginTimestamp && Date.now() - Number(loginTimestamp) < 10000;

    if (!isAuthenticated && !(isLoginRedirect && isRecentLogin)) {
      navigate("/auth/login");
    }

    if (isAuthenticated && isLoginRedirect) {
      sessionStorage.removeItem("isRedirectingAfterLogin");
      sessionStorage.removeItem("loginTimestamp");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}