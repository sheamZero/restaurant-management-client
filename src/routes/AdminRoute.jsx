import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import PageLoader from "../pages/components/PageLoader/PageLoader";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();

        console.log("location inside admin routes", location);


    if (isLoading || isAdminLoading) return <PageLoader />;

    if (user && isAdmin) return children;

    // Redirect non-admins or unauthenticated users to sign-in with intended page
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default AdminRoute;
