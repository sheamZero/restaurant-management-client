import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";


export const useGetAllReservation = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    return useQuery({
        queryKey: ['reservation', email],
        enabled: !!email,
        queryFn: async () => {
            const { data } = await axiosSecure.get("/dashboard/reservation")
            return data
        }

    })
}

export const useAddAReserveTable = () => {
    const axiosSecure = useAxiosSecure();
    return useMutation({
        mutationFn: async (reservation_details) => {
            const { data } = await axiosSecure.post('/dashboard/reservation', reservation_details)
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Successfully reserve a table!",
                    icon: "success",
                    confirmButtonColor: "#facc15",
                    padding: "1.5rem",
                    width: 400,
                });
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