

import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();

    if (isLoading || isAdminLoading) return <p className="text-center p-10 font-medium">loading...</p>

    if (user && isAdmin) return children;

    return <Navigate to={"/"} state={location.pathname} replace={true}></Navigate>
};

export default AdminRoute;