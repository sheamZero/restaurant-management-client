import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";


export const useGetAllPayment = () => {
    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["payment", email], // cache per user
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payment-history`);
            return data;
        },
        enabled: !!email, // only run query if email exists
    });
};