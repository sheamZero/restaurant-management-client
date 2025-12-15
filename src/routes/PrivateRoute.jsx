import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import loader3 from "../assets/others/loader3.gif";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <img src={loader3} alt="Loading..." className="w-24" />
            </div>
        );
    }

    if (user) return children;

    return <Navigate to={"/sign-in"} state={location.pathname} replace={true}></Navigate>

};

export default PrivateRoute;