import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  let auth = { token: false };

  if (localStorage.getItem("token")) {
    auth = { token: true };
  }
  return auth.token ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;