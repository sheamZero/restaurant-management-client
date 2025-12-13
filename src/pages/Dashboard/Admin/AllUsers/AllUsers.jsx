import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await axiosSecure.get("/admin/users");
            return result.data;
        }
    })

    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be an admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`users/${user._id}`);
                // console.log("pathchccc = ", res.data);
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.displayName} is now an admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    const handleDeleteUser = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`users/${user._id}`);
                refetch();
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.displayName} has beed deleted!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    console.log(users);



    return (
        <section>
            <SectionTitle title="Manage All User" subTitle="How Many??"></SectionTitle>

            <div className="overflow-x-auto bg-white mx-auto p-8 mt-5 rounded">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-3xl">Total Users : {users.length}</h2>
                </div>

                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054] rounded-tl-5xl rounded-tr-5xl">
                        <tr className="text-base font-bold">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => (
                                <tr key={user._id}>
                                    <td className="font-bold">{idx + 1}</td>
                                    <td>{user.name} </td>
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
                    </tbody>

                </table>
            </div>
        </section>
    );
};

export default AllUsers;