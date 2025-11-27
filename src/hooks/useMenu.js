import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const useAllMenu = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/all-menu")
            return data
        }
    })
}

export const useMenuByCategory = (cat = "") => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/menu?category=${cat}`)
            return data;
        }
    })
}