import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const UserPrivateRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.userAuth);
  return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default UserPrivateRoutes;
