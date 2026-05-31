import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../pages/shared/loading/Loading";
import Forbidden from "./Forbidden";

const AdminRoute = ({children}) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) return <Loading></Loading>;
  if(role !== 'admin') return <Forbidden></Forbidden>
  return children
};

export default AdminRoute;
