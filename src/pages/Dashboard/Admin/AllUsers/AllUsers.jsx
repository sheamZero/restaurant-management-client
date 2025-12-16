import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrash, FaUsers } from "react-icons/fa";
import DataTable from "../../../components/DataTable/DataTable";
import { successAction, confirmAction, errorAction } from "../../../../utils/swal";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await axiosSecure.get("/admin/users");
            return result.data;
        }
    })

    // update user role
    const handleMakeAdmin = async (user) => {
        const isConfirmed = await confirmAction({
            title: "Make Admin?",
            text: `${user.displayName} will get admin access.`,
            confirmText: "Yes, make admin",
        });

        if (!isConfirmed) return;

        try {
            const res = await axiosSecure.patch(`/users/${user._id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                await successAction(`${user.displayName} is now an admin!`);
            } else {
                throw new Error("No changes were made.");
            }
        } catch (err) {
            await errorAction(
                err.response?.data?.message || "Failed to update user role"
            );
        }
    };


    const handleDeleteUser = async (user) => {
        const isConfirmed = await confirmAction({
            title: "Delete User?",
            text: `This will permanently delete ${user.displayName}.`,
            confirmText: "Yes, delete",
        });

        if (!isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/users/${user._id}`);

            if (res.data.deletedCount > 0) {
                refetch();
                await successAction(`${user.displayName} has been deleted.`);
            } else {
                throw new Error("User could not be deleted.");
            }
        } catch (err) {
            await errorAction(
                err.response?.data?.message ||
                err.message ||
                "Failed to delete user"
            );
        }
    };


    return (
        <section>
            <SectionTitle title="Manage All User" subTitle="How Many??"></SectionTitle>

            <DataTable
                title={"Total Bookings"}
                len={users.length}
                isLoading={isLoading}
                columns={[
                    "#",
                    "Name",
                    "Email",
                    "Role",
                    "Action"
                ]}
            >
                {
                    users.map((user, idx) => (
                        <tr key={user._id}>
                            <td className="font-bold">{idx + 1}</td>
                            <td>{user.displayName} </td>
                            <td>{user.email} </td>
                            <td>
                                {
                                    user?.role ? "Admin" : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-[#D1A054] hover:bg-[#D1A054]">
                                        <FaUsers className="font-bold text-white"></FaUsers>
                                    </button>
                                }
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="btn btn-secondary">
                                    <FaTrash className="font-bold"></FaTrash>
                                </button>
                            </td>

                        </tr>
                    ))
                }
            </DataTable>

        </section>
    );
};

export default AllUsers;