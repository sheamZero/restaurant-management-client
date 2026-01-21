import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

// specific user reservation hooks
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

export const useGetAllReservationFromDb = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    return useQuery({
        queryKey: ['reservation', email],
        enabled: !!email,
        queryFn: async () => {
            const { data } = await axiosSecure.get("/dashboard/reservations")
            return data
        }

    })
}

export const useAddAReserveTable = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
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
                navigate('/dashboard/my-booking');
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



export const useDeleteReserveTable = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item) => {
            const { data } = await axiosSecure.delete(`/dashboard/reservation/${item._id}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ["reservation"] })
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
