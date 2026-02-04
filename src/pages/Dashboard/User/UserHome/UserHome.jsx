import { MdMenu, MdMail } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from "../../../../hooks/useAuth";
import { useAllMenu } from "../../../../hooks/useMenu";
import { useGetAllCart } from "../../../../hooks/useCart";
import { useGetAllPayment } from "../../../../hooks/usePayment";
import PageLoader from "../../../components/PageLoader/PageLoader";

const UserHome = () => {
    const { user } = useAuth();
    const { data: menuItems = [], isLoading } = useAllMenu();
    const { data: cartItems = [], isLoading: cartLoading } = useGetAllCart();
    const { data: reservation = [], isLoading: reservationLoading } = useGetAllCart();
    const { data: payments = [], isLoading: paymentLoading } = useGetAllPayment();


    const totalCartIdsLength = payments.reduce(
        (sum, p) => sum + (Array.isArray(p.cartIds) ? p.cartIds.length : 0),
        0
    );




    if (isLoading || cartLoading || reservationLoading || paymentLoading) return <PageLoader />

    console.log(totalCartIdsLength);

    return (
        <div className="w-full py-8">
            <h2 className="text-3xl font-bold">Hi, Welcome Back!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-6">

                {/* Menu */}
                <div className="p-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center gap-4 text-white">
                    <MdMenu className="text-5xl" />
                    <div>
                        <p className="text-2xl font-semibold">{menuItems.length}</p>
                        <p className="text-lg font-medium">Menu</p>
                    </div>
                </div>

                {/* Shop */}
                <div className="p-8 rounded-lg bg-gradient-to-r from-[#D3A256] to-[#FCE8C0] flex items-center justify-center gap-4 text-white">
                    <FaShoppingBag className="text-5xl" />
                    <div>
                        <p className="text-2xl font-semibold">{cartItems.length}</p>
                        <p className="text-lg font-medium">Shop</p>
                    </div>
                </div>

                {/* Contact */}
                <div className="p-8 rounded-lg bg-gradient-to-r from-[#FE4880] to-[#FDCCE8] flex items-center justify-center gap-4 text-white">
                    <MdMail className="text-5xl" />
                    <div>
                        <p className="text-2xl font-semibold">87</p>
                        <p className="text-lg font-medium">Contact</p>
                    </div>
                </div>

            </div>

            {/* bottom */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2">

                <div className=" border-r-4 border-r-primary bg-mint flex flex-col items-center justify-center gap-5 p-20">
                    <div className="w-48 h-48 rounded-full">
                        <img className="bg-center w-48 h-48 border-2 border-primary object-cover rounded-full hover:border-4" src={user?.photoURL} alt="" />
                    </div>
                    <p className="text-2xl font-medium uppercase ">{user?.displayName}</p>
                </div>

                {/* update here */}
                <div className="p-20 bg-yellow-100">
                    <p className="text-4xl font-medium uppercase mb-8">Your Activity</p>

                    <div className="space-y-4">

                        {/* Order */}
                        <div className="flex items-center gap-2 text-purple-500">
                            <MdMenu className="text-2xl" />
                            <span className="text-2xl">Order: {cartItems.length}</span>
                        </div>

                        {/* Review */}
                        <div className="flex items-center gap-2 text-green-500">
                            <FaShoppingBag className="text-2xl" />
                            <span className="text-2xl">Review: 3</span>
                        </div>

                        {/* Payment */}
                        <div className="flex items-center gap-2 text-blue-500">
                            <MdMail className="text-2xl" />
                            <span className="text-2xl">Payment: {totalCartIdsLength}</span>
                        </div>

                        {/* Booking */}
                        <div className="flex items-center gap-2 text-red-500">
                            <MdMenu className="text-2xl" />
                            <span className="text-2xl">Booking: {reservation.length}</span>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default UserHome;
