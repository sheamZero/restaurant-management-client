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

export const useMenuById = (id) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["menu", id],
        enabled: !!id, // prevents query from running without id
        queryFn: async () => {
            const res = await axiosSecure.get(`/menu/${id}`);
            return res.data;
        },
    });
};