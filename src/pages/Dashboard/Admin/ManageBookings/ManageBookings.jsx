
import { GiCheckMark } from 'react-icons/gi';
import { useGetAllReservationFromDb } from '../../../../hooks/useReservation';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import DataTable from '../../../components/DataTable/DataTable';
import PageLoader from '../../../components/PageLoader/PageLoader';
import { confirmAction, errorAction, successAction } from '../../../../utils/swal';

const ManageBookings = () => {
    const { data = [], isLoading, refetch } = useGetAllReservationFromDb();
    const axiosSecure = useAxiosSecure();

    console.log(data);

    const handleBookingActivity = async (id) => {

        const isConfirmed = await confirmAction({
            title: "Mark as Done?",
            text: "This booking will be marked as completed.",
            confirmText: "Yes, mark done",
        });

        if (!isConfirmed) return;

        try {
            // pending / done 
            const res = await axiosSecure.patch(`admin/reservation/${id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                await successAction("Activity is done!");
            } else {
                throw new Error("No change were made!");
            }
        } catch (err) {
            await errorAction(err.response?.data?.message || "Failed to update activity");
        }
    }

    if (isLoading) {
        return <PageLoader></PageLoader>
    }

    return (
        <section>
            <SectionTitle title="Manage all bookings" subTitle="Get A Glance!" />
            <DataTable
                title={"Total Bookings"}
                len={data.length}
                isLoading={isLoading}
                columns={[
                    "#",
                    "User Email",
                    "Phone",
                    "Booking Date",
                    "Booking Time",
                    "Status",
                    "Activity",
                    "Action"
                ]}
            >
                {data.map((item, idx) => (
                    <tr key={item._id}>
                        <td className="font-bold">{idx + 1}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.phone}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td className="text-btnHover capitalize font-semibold">{item.paymentStatus}</td>
                        <td className={`font-bold ${item.activity === 'Done' ? 'text-green-700' : 'text-yellow-700'}`}>{item.activity}</td>
                        <td>
                            <button
                                onClick={() => handleBookingActivity(item._id)} className="btn btn-circle bg-green-300 text-black hover:bg-green-400 border-0  ">
                                <GiCheckMark />
                            </button>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </section>
    );
};


export default ManageBookings;