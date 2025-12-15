
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAllMenu } from '../../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageItems = () => {
    const { data: menuItems = [], isPending, refetch } = useAllMenu();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleDeleteMenuItem = async (menuItem) => {
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
                const res = await axiosSecure.delete(`menu/${menuItem._id}`);
                refetch();
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${menuItem.name} has beed deleted!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }


    if (isPending) return <p className="text-center p-10 font-medium">loading...</p>
    return (
        <section>
            <SectionTitle title='manage all items' subTitle='Hurry Up!'></SectionTitle>

            <div className="overflow-x-auto bg-white mx-auto p-8 mt-5 rounded">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-3xl">Total Users : {menuItems.length}</h2>
                </div>

                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054] rounded-tl-5xl rounded-tr-5xl">
                        <tr className="text-base font-bold">
                            <th></th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menuItems.map((menuItem, idx) => (
                                <tr key={menuItem._id}>
                                    <td className="font-bold">{idx + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-16 w-16">
                                                <img
                                                    src={menuItem.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{menuItem.name} </td>
                                    <td>{menuItem.price} </td>
                                    <td>

                                        <button
                                            onClick={() => navigate(`/dashboard/admin/update-item/${menuItem._id}`)}
                                            className="btn bg-[#D1A054] hover:bg-[#D1A054]">
                                            <FaEdit className="font-bold text-white"></FaEdit>
                                        </button>

                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteMenuItem(menuItem)}
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

export default ManageItems;