import { FaShoppingCart, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useDeleteCartItems, useGetAllCart } from "../../../../hooks/useCart";
import { confirmAction } from "../../../../utils/swal";
import { Link } from "react-router-dom";
import EmptyState from "../../../components/EmptyState/EmptyState";

const MyCart = () => {
    const { data = [] } = useGetAllCart();
    const { mutateAsync } = useDeleteCartItems();

    const totalCartPrice = data.reduce(
        (accumulator, currentItem) => accumulator + currentItem.price,
        0
    );

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
            console.log(err);
        }
    };

    return (
        <div>
            <SectionTitle title="Wanna Add More?" subTitle="My Cart" />

            {
                data.length > 0 ? (
                    <div className="overflow-x-auto bg-white mx-auto p-8 mt-6 rounded-xl shadow-sm border border-slate-200">
                        {/* Summary */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                            <h2 className="font-semibold text-2xl text-slate-800">
                                Total Order:{" "}
                                <span className="text-primary">{data.length}</span>
                            </h2>

                            <h2 className="font-semibold text-2xl text-slate-800">
                                Total Pay:{" "}
                                <span className="text-primary">${totalCartPrice}</span>
                            </h2>

                            {/* Summary - Pay Button */}
                            <Link to="/dashboard/payments?type=cart">
                                <button className="bg-primary text-white font-semibold text-lg px-8 py-2 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
                                    Pay
                                </button>
                            </Link>

                        </div>

                        {/* Table */}
                        <table className="table w-full">
                            <thead className="bg-primary">
                                <tr className="text-base font-semibold text-white">
                                    <th>#</th>
                                    <th>Item Photo</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((cart, idx) => (
                                    <tr
                                        key={cart._id}
                                        className="hover:bg-slate-50 transition"
                                    >
                                        <td className="font-semibold text-slate-700">
                                            {idx + 1}
                                        </td>

                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-16 w-16 border border-slate-200">
                                                    <img
                                                        src={cart.image}
                                                        alt={cart.name}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="font-medium text-slate-700">
                                            {cart.name}
                                        </td>

                                        <td className="font-semibold text-slate-800">
                                            ${cart.price}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleDeleteCartItem(cart)}
                                                className="bg-red-500 text-white btn-sm px-3 py-2 rounded-md shadow-sm hover:bg-red-600 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                            >
                                                <FaTrash className="text-base" />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                        icon={<FaShoppingCart />}
                        title="Your Cart Is Empty"
                        description="Add items from our menu to get started."
                        primaryAction={{
                            label: "Browse Menu",
                            to: "/our-menu",
                        }}
                    />
                )
            }
        </div>
    );
};

export default MyCart;
