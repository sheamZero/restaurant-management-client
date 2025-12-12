import { FaTrash } from "react-icons/fa";
import { useGetAllReservation } from "../../../../hooks/useReservation";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const MyBooking = () => {
    const { data, isLoading } = useGetAllReservation();
    console.log(data);

    if (isLoading) return <p className="text-xl text-center">loading...</p>
    return (
        <div>
            <SectionTitle subTitle="Excellent Ambience" title="My Bookings"></SectionTitle>


            <div className="overflow-x-auto bg-white mx-auto p-8 mt-5 rounded">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-3xl">Total Order : {data?.length}</h2>
                    <h2 className="font-semibold text-3xl">Total Pay : </h2>
                    <button className="btn btn-info font-semibold text-xl">Pay</button>
                </div>

                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054] rounded-tl-5xl rounded-tr-5xl">
                        <tr className="text-base font-bold">
                            <th></th>
                            <th>User Email</th>
                            <th>Guests</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
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
                                    <td>
                                        <button className="btn btn-secondary">
                                            <FaTrash className="font-bold" />
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

export default MyBooking;