import { FaCalendarTimes, FaTrash } from "react-icons/fa";
import {
    useDeleteReserveTable,
    useGetAllReservation
} from "../../../../hooks/useReservation";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { confirmAction } from "../../../../utils/swal";
import EmptyState from "../../../components/EmptyState/EmptyState";


const MyBooking = () => {
    const { data, isLoading } = useGetAllReservation();
    const { mutateAsync } = useDeleteReserveTable();

    console.log(data);
    const totalPrice = data?.reduce((sum, item) => sum + item.price, 0);
    console.log(totalPrice);



    const handleDeleteReservation = async (item) => {
        console.log("object", item);
        try {
            const isConfirmed = await confirmAction({
                title: "Delete Reserve Table?",
                text: `Are you sure you want to remove "${item.name}" from your Reservation?`,
                confirmText: "Yes, delete it",
            });

            if (!isConfirmed) return;
            // delete reservation item
            await mutateAsync(item);
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return <p className="text-xl text-center">loading...</p>
    return (
        <div>
            <SectionTitle subTitle="Excellent Ambience" title="My Bookings"></SectionTitle>



            {
                data.length > 0
                    ? (
                        <div className="overflow-x-auto bg-white mx-auto p-8 mt-5 rounded">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-semibold text-3xl">Total Reserve : {data?.length}</h2>
                                <h2 className="font-semibold text-3xl">Total Pay : ${totalPrice}</h2>
                                <Link to="/dashboard/payments?type=reservation">
                                    <button className="bg-primary text-white font-semibold text-lg px-8 py-2 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
                                        Pay
                                    </button>
                                </Link>
                            </div>

                            <table className="table">
                                {/* head */}
                                <thead className="bg-primary rounded-tl-5xl rounded-tr-5xl text-white">
                                    <tr className="text-base font-bold">
                                        <th></th>
                                        <th>User Email</th>
                                        <th>Guests</th>
                                        <th>Booking Date</th>
                                        <th>Booking Time</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {
                                        data.map((item, idx) => (
                                            <tr key={item._id}>
                                                <td className="font-bold">{idx + 1}</td>
                                                <td className="font-bold">{item.email}</td>
                                                <td>{item.guests}</td>
                                                <td>{item.date}</td>
                                                <td>{item.time}</td>
                                                <td className="font-medium uppercase text-primary">{item.paymentStatus}</td>

                                                <td>
                                                    <button
                                                        onClick={() => handleDeleteReservation(item)}
                                                        className="bg-red-500 text-white btn-sm px-3 py-2 rounded-md shadow-sm hover:bg-red-600 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                                    >
                                                        <FaTrash className="text-base" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </table>
                        </div>
                    )
                    :
                    (
                        <EmptyState
                            icon={<FaCalendarTimes />}
                            title="No Reservations Found"
                            description="You haven't booked any tables yet."
                            primaryAction={{
                                label: "Book a Table",
                                to: "/dashboard/reservation",
                            }}
                        />
                    )
            }
        </div>
    );
};

export default MyBooking;