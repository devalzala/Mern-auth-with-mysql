import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  let auth = { token: true };

  if (!localStorage.getItem("token")) {
    auth = { token: false };
  }
  return !auth.token ? <Outlet /> : <Navigate to={"/dashboard"} />;
}

export default PublicRoutes;