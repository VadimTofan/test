import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./app/providers";

export default function RequireAuth({ children }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <div>Loading...</div>;

  if (!user) {

    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
