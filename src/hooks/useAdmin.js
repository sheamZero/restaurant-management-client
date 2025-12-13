import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', email],
        enabled: !!email,    
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/users/${email}`);
            return res.data.isAdmin;     
        }
    });

    return { isAdmin, isAdminLoading };
};

export default useAdmin;
