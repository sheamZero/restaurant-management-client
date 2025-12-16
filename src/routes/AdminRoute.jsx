
import loader2 from '../assets/others/loader2.gif';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { useAuth } from '../hooks/useAuth';
import PageLoader from '../pages/components/PageLoader/PageLoader';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();

    if (isLoading || isAdminLoading) return <PageLoader></PageLoader>

    if (user && isAdmin) return children;

    return <Navigate to={"/"} state={location.pathname} replace={true}></Navigate>
};

export default AdminRoute;