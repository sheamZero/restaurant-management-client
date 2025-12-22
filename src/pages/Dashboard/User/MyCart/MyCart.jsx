import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useDeleteCartItems, useGetAllCart } from "../../../../hooks/useCart";
import { confirmAction, } from "../../../../utils/swal";
import { Link } from "react-router-dom";


const MyCart = () => {
    const { data = [] } = useGetAllCart();
    const { mutateAsync } = useDeleteCartItems();

    const totalCartPrice = data.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price;
    }, 0);

    const handleDeleteCartItem = async (cart) => {
        try {
            const isConfirmed = await confirmAction({
                title: "Delete Cart Item?",
                text: `Are you sure you want to remove "${cart.name}" from your cart?`,
                confirmText: "Yes, delete it",
            });

            if (!isConfirmed) return;

            await mutateAsync(cart);

        } catch (err) {
            await errorAction(err.response?.data?.message || err.message || "Something went wrong!");
        }
    };


    return (
        <div>
            <SectionTitle title="Wanna Add More?" subTitle="My Cart"></SectionTitle>

            <div className="overflow-x-auto bg-white mx-auto p-8 mt-5 rounded">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-3xl">Total Order : {data.length}</h2>
                    <h2 className="font-semibold text-3xl">Total Pay : ${totalCartPrice}</h2>
                    <Link to={"/dashboard/payments"}>
                        <button className="btn btn-info font-semibold text-xl">Pay</button>
                    </Link>
                </div>

                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054] rounded-tl-5xl rounded-tr-5xl">
                        <tr className="text-base font-bold">
                            <th></th>
                            <th>Item Photo</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((cart, idx) => (
                                <tr key={cart._id}>
                                    <td className="font-bold">{idx + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-16 w-16">
                                                <img
                                                    src={cart.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cart.name} </td>
                                    <td>{cart.price}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteCartItem(cart)}
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
        </div>

    );
};

export default MyCart;