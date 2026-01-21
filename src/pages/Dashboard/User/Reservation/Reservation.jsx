import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { LuPhoneCall } from 'react-icons/lu';
import { FaClock } from 'react-icons/fa';
import { IoBook, IoLocationOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useAddAReserveTable } from '../../../../hooks/useReservation';

const Reservation = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { mutateAsync, isPending } = useAddAReserveTable();

    const onSubmit = async (data) => {
        const reservation_details = {
            ...data,
            paymentStatus: "unpaid",
            price: data.tableType === "standard" ? 20 : data.tableType === "vip" ? 50 : 80
        }
        try {
            await mutateAsync(reservation_details);
            reset();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <SectionTitle title="book a table" subTitle="Reservation" />

            {/* form */}
            <div className="w-full flex items-center justify-center px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-xl p-8 md:p-12 w-full max-w-5xl"
                >

                    {/* Row 1: Date + Time + Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {[
                            { label: "Date*", type: "date", name: "date", msg: "Date is required" },
                            { label: "Time*", type: "time", name: "time", msg: "Time is required" }
                        ].map(({ label, type, name, msg }) => (
                            <div key={name}>
                                <label className="block text-slate-700 font-medium mb-2">{label}</label>
                                <input
                                    type={type}
                                    {...register(name, { required: msg })}
                                    className="w-full border border-slate-300 rounded-md px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/70"
                                />
                                {errors[name] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                                )}
                            </div>
                        ))}

                        {/* Guests */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Guests*</label>
                            <select
                                {...register("guests", { required: "Please select number of guests" })}
                                className="w-full border border-slate-300 rounded-md px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/70"
                            >
                                <option value="">Select guests</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {i === 0 ? "Guest" : "Guests"}
                                    </option>
                                ))}
                            </select>
                            {errors.guests && (
                                <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Table Type + Phone + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        {/* Table Type */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Table Type*</label>
                            <select
                                {...register("tableType", { required: "Please select a table type" })}
                                className="w-full border border-slate-300 rounded-md px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/70"
                            >
                                <option value="">Select table type</option>
                                <option value="standard">Standard - $20</option>
                                <option value="vip">VIP - $50</option>
                                <option value="family">Family - $80</option>
                            </select>
                            {errors.tableType && (
                                <p className="text-red-500 text-sm mt-1">{errors.tableType.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Phone*</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register("phone", { required: "Phone is required" })}
                                className="w-full border border-slate-300 rounded-md px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/70"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-slate-700 font-medium mb-2">Email*</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email"
                                    }
                                })}
                                className="w-full border border-slate-300 rounded-md px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/70"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`bg-primary flex items-center gap-3 text-white font-semibold px-10 py-3 rounded-md transition-all
                ${isPending
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:bg-primary/90 active:scale-[0.98]"
                                }`}
                        >
                            {isPending ? "Booking..." : "Book A Table"}
                            <IoBook className="text-2xl" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col md:flex-row justify-between my-12 gap-6">

                {/* Phone */}
                <div className="flex-1 min-w-[280px] p-6 border border-sky-200 relative rounded-xl shadow-sm hover:shadow-lg transition">
                    <div className="py-24 bg-sky-50 rounded-lg flex flex-col items-center">
                        <p className="text-2xl font-semibold uppercase text-slate-800 mb-2">
                            Phone
                        </p>
                        <p className="text-base text-slate-600">01909-758810</p>
                    </div>
                    <div className="absolute top-0 left-0 bg-sky-500 w-full h-20 flex items-center justify-center rounded-t-xl">
                        <IoLocationOutline className="text-white text-3xl" />
                    </div>
                </div>

                {/* Address */}
                <div className="flex-1 min-w-[280px] p-6 border border-amber-200 relative rounded-xl shadow-sm hover:shadow-lg transition">
                    <div className="py-24 bg-amber-50 rounded-lg flex flex-col items-center">
                        <p className="text-2xl font-semibold uppercase text-slate-800 mb-2">Address</p>
                        <p className="text-base text-slate-600">xxxx-xxxx-xxxx</p>
                    </div>
                    <div className="absolute top-0 left-0 bg-amber-500 w-full h-20 flex items-center justify-center rounded-t-xl">
                        <FaClock className="text-white text-3xl" />
                    </div>
                </div>

                {/* Working Hours */}
                <div className="flex-1 min-w-[280px] p-6 border border-emerald-200 relative rounded-xl shadow-sm hover:shadow-lg transition">
                    <div className="py-24 bg-emerald-50 rounded-lg flex flex-col items-center">
                        <p className="text-2xl font-semibold uppercase text-slate-800 mb-2">Working Hours</p>
                        <p className="text-base text-slate-600">Mon–Fri : 10am–12pm</p>
                        <p className="text-base text-slate-600">Sat–Sun : 10am–12pm</p>
                    </div>
                    <div className="absolute top-0 left-0 bg-emerald-500 w-full h-20 flex items-center justify-center rounded-t-xl">
                        <LuPhoneCall className="text-white text-3xl" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reservation;
