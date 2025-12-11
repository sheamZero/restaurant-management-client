import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();

    if (isLoading) return <p className="text-center p-10 font-medium">loading...</p>

    if (user) return children;

    return <Navigate to={"/sign-in"} state={location.pathname} replace={true}></Navigate>

};

export default PrivateRoute;