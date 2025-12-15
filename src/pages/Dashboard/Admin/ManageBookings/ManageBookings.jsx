
import { GiCheckMark } from 'react-icons/gi';
import { useGetAllReservationFromDb } from '../../../../hooks/useReservation';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import DataTable from '../../../components/DataTable/DataTable';
import PageLoader from '../../../components/PageLoader/PageLoader';

const ManageBookings = () => {
    const { data = [], isLoading, refetch } = useGetAllReservationFromDb();
    const axiosSecure = useAxiosSecure();

    const handleBookingActivity = async id => {
        // pending / done 
        const res = await axiosSecure.patch(`admin/reservation/${id}`)
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Activity is Done!",
                showConfirmButton: false,
                timer: 1500
            });
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
                        <td className={`font-bold ${item.activity === 'Done' ? 'text-green-700' : 'text-yellow-700'}`}>{item.activity}</td>
                        <td>
                            <button onClick={() => handleBookingActivity(item._id)} className="btn btn-circle bg-green-300">
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