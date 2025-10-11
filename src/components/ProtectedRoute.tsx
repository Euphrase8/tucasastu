import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute check → token:", token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
