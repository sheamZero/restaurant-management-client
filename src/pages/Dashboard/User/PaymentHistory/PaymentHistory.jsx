import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import PageLoader from "../../../components/PageLoader/PageLoader";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import EmptyState from "../../../components/EmptyState/EmptyState";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ["payment-history"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payment-history");
            return res.data;
        }
    });

    if (isLoading) return <PageLoader />;

    const totalPaid = data.reduce(
        (sum, payment) => sum + Number(payment.amount || 0),
        0
    );

    return (
        <div>
            <SectionTitle title="Payment History" subTitle="My Payments" />

            {
                data.length > 0 ? (
                    <div className="overflow-x-auto bg-white mx-auto p-8 mt-6 rounded-xl shadow-sm border border-slate-200">
                        {/* Summary */}
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <h2 className="font-semibold text-2xl text-slate-800">
                                Total Payments:{" "}
                                <span className="text-primary">{data.length}</span>
                            </h2>

                            <h2 className="font-semibold text-2xl text-slate-800">
                                Total Paid:{" "}
                                <span className="text-primary">${totalPaid}</span>
                            </h2>
                        </div>

                        {/* Table */}
                        <table className="table w-full">
                            <thead className="bg-primary">
                                <tr className="text-base font-semibold text-white">
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Transaction ID</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((payment, idx) => {
                                    const itemsCount =
                                        payment.type === "cart"
                                            ? payment.cartIds.length
                                            : payment.reservationIds.length;

                                    return (
                                        <tr
                                            key={payment._id}
                                            className="hover:bg-slate-50 transition"
                                        >
                                            <td className="font-semibold">
                                                {idx + 1}
                                            </td>

                                            <td>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${payment.type === "cart"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                        }`}
                                                >
                                                    {payment.type.toUpperCase()}
                                                </span>
                                            </td>

                                            <td className="font-mono text-sm text-slate-600">
                                                {payment.transactionId}
                                            </td>

                                            <td className="text-center font-medium">
                                                {itemsCount}
                                            </td>

                                            <td className="font-semibold text-slate-800">
                                                ${payment.amount}
                                            </td>

                                            <td>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${payment.status === "paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {payment.status}
                                                </span>
                                            </td>

                                            <td className="text-slate-600">
                                                {new Date(payment.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                        title="No Payment History"
                        description="You have not made any payments yet. Explore our menu and make your first order or reservation!"
                        primaryAction={{ to: "/our-menu", label: "Explore Menu" }}
                        secondaryAction={{ to: "/dashboard/reservation", label: "Make Reservation" }}
                    />
                )
            }
        </div>
    );
};

export default PaymentHistory;
