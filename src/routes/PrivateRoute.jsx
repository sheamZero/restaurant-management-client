import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();

    if (isLoading) return <span className="loading loading-spinner text-3xl text-primary"></span>

    if (user) return children;

    return <Navigate to={"/sign-in"} state={location.pathname} replace={true}></Navigate>

};

export default PrivateRoute;