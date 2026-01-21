import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import loader3 from "../assets/others/loader3.gif";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();

    console.log("location inside private routes", location);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <img src={loader3} alt="Loading..." className="w-24" />
            </div>
        );
    }

    if (user) return children;

    // Redirect to sign-in, preserving the page user tried to access
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
