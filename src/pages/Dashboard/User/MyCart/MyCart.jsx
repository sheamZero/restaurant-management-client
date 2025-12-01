import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useGetAllCart } from "../../../../hooks/useCart";


const MyCart = () => {
    const { data = [] } = useGetAllCart();

    return (
        <div>
            <SectionTitle title="Wanna Add More?" subTitle="My Cart"></SectionTitle>


            <div className="overflow-x-auto bg-white mx-auto p-12 rounded">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-3xl">Total Order : 6</h2>
                    <h2 className="font-semibold text-3xl">Total Pay : 6</h2>
                    <button className="btn btn-info font-semibold text-xl">Pay</button>
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
                                        <button className="btn btn-secondary">
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