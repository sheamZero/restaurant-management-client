import { MdMenu, MdMail, MdDashboard } from "react-icons/md";
import { FaUsers, FaShoppingBag } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

/* -------------------- */
/* Custom Rounded Bar   */
/* -------------------- */
const CustomBar = ({ x, y, width, height, fill }) => (
    <rect x={x} y={y} width={width} height={height} rx={8} ry={8} fill={fill} />
);

const COLORS = ["#4f46e5", "#22c55e", "#f97316"];

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: adminStatistics = { users: 0, orders: 0, revenue: 0 },
        isLoading,
        error,
    } = useQuery({
        queryKey: ["adminStatistics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-statistics");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="py-20 text-center text-xl font-semibold">
                Loading admin dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-red-500">
                Failed to load admin statistics
            </div>
        );
    }

    const { users, orders, revenue } = adminStatistics;

    /* -------------------- */
    /* Chart Data (REAL)    */
    /* -------------------- */
    const barData = [
        { name: "Users", value: users },
        { name: "Orders", value: orders },
        { name: "Revenue", value: revenue },
    ];

    const pieData = [
        { name: "Users", value: users },
        { name: "Orders", value: orders },
    ];

    return (
        <div className="w-full py-6 px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Hi, Welcome Admin!
            </h2>

            {/* ================= TOP STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <StatCard
                    icon={<FaUsers />}
                    label="Users"
                    value={users}
                    bg="from-indigo-500 to-indigo-700"
                />

                <StatCard
                    icon={<FaShoppingBag />}
                    label="Orders"
                    value={orders}
                    bg="from-primary to-secondary"
                />

                <StatCard
                    icon={<MdMenu />}
                    label="Revenue"
                    value={`$${revenue.toFixed(2)}`}
                    bg="from-green-500 to-green-700"
                />
            </div>

            {/* ================= CHARTS ================= */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Bar Chart */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <p className="text-xl font-semibold mb-4 text-center">
                        System Overview
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                shape={<CustomBar />}
                                fill="#6366f1"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <p className="text-xl font-semibold mb-4 text-center">
                        Users vs Orders
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {pieData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

           
        </div>
    );
};

/* -------------------- */
/* Reusable Components  */
/* -------------------- */

const StatCard = ({ icon, label, value, bg }) => (
    <div
        className={`p-6 rounded-lg bg-gradient-to-r ${bg} flex items-center gap-4 text-white`}
    >
        <div className="text-4xl">{icon}</div>
        <div>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-lg">{label}</p>
        </div>
    </div>
);

const Action = ({ icon, text }) => (
    <div className="flex items-center gap-3 text-lg">
        <span className="text-2xl">{icon}</span>
        <span>{text}</span>
    </div>
);

export default AdminHome;
