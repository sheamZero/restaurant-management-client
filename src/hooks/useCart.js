import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";


export const useGetAllCart = () => {
    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["cart", email], // cache per user
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/cart`);
            return data;
        },
        enabled: !!email, // only run query if email exists
    });
};

export const useAddToCart = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (cartItem) => {
            const { data } = await axiosSecure.post("/cart", cartItem);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Item added to cart successfully",
                    icon: "success",
                    confirmButtonColor: "#facc15",
                    padding: "1.5rem",
                    width: 400,
                });

                // Refresh ALL cart-related queries
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
        },
        onError: (error) => {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#facc15",
                padding: "1.5rem",
                width: 400,
            });
        }
    });
};

export const useDeleteCartItems = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/cart/${id}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ["cart"] })
            }
        },
        onError: (error) => {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#facc15",
                padding: "1.5rem",
                width: 400,
            });
        }
    })
}


