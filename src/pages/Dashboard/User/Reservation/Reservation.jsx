
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
        try {
            const res = await mutateAsync(data);
            console.log(res);
            reset();
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <SectionTitle title='book a table' subTitle='Reservation'></SectionTitle>


            {/* form */}
            <div className="w-full flex items-center justify-center px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-lg p-8 md:p-12 w-full max-w-5xl "
                >

                    {/* Row 1: Date + Time + Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Date*
                            </label>
                            <input
                                type="date"
                                {...register("date", { required: "Date is required" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors?.date?.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Time*
                            </label>
                            <input
                                type="time"
                                {...register("time", { required: "Time is required" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Guests*
                            </label>
                            <select
                                {...register("guests", { required: "Please select number of guests" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            >
                                <option value="">Select guests</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? "Guest" : "Guests"}
                                    </option>
                                ))}
                            </select>
                            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
                        </div>
                    </div>

                    {/* Row 2: Name + Phone + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Name*
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Phone*
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register("phone", { required: "Phone is required" })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Email*
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                                })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`bg-[#D1A054] flex items-center gap-3 text-white font-semibold px-8 py-3 rounded-md transition-all ${isPending ? "opacity-60 cursor-not-allowed" : "hover:bg-[#b88845]"}`}
                        >
                            {isPending ? "Booking..." : "Book A Table"}
                            <IoBook className="text-2xl" />
                        </button>
                    </div>


                </form>
            </div>



            <div className='flex flex-col md:flex-row justify-between my-10 gap-6'>
                <div className='flex-1 min-w-[280px] p-6 border relative rounded'>
                    <div className='py-24 w-full flex flex-col items-center justify-center bg-[#F3F3F3] rounded'>
                        <p className='text-2xl font-medium py-6 uppercase'>Phone</p>
                        <p className='text-sm opacity-80 md:text-base'>01909-758810</p>
                    </div>
                    <div className='absolute top-0 left-0 bg-[#D1A054] w-full h-20 flex items-center justify-center rounded-tl-sm rounded-tr-sm'>
                        <IoLocationOutline className='text-white text-3xl font-semibold' />
                    </div>
                </div>

                <div className='flex-1 min-w-[280px] p-6 border relative rounded'>
                    <div className='py-24 w-full flex flex-col items-center justify-center bg-[#F3F3F3] rounded'>
                        <p className='text-2xl font-medium py-6 uppercase'>Address</p>
                        <p className='text-sm opacity-80 md:text-base'>xxxx-xxxx-xxxx</p>
                    </div>
                    <div className='absolute top-0 left-0 bg-[#D1A054] w-full h-20 flex items-center justify-center rounded-tl-sm rounded-tr-sm'>
                        <FaClock className='text-white text-3xl font-semibold' />
                    </div>
                </div>

                <div className='flex-1 min-w-[280px] p-6 border relative rounded'>
                    <div className='py-24 w-full flex flex-col items-center justify-center bg-[#F3F3F3] rounded'>
                        <p className='text-2xl font-medium py-6 uppercase'>Working Hours</p>
                        <p className='text-sm opacity-80 md:text-base'>Mon-Fri : 10am-12pm</p>
                        <p className='text-sm opacity-80 md:text-base'>Sat-Sun : 10am-12pm</p>
                    </div>
                    <div className='absolute top-0 left-0 bg-[#D1A054] w-full h-20 flex items-center justify-center rounded-tl-sm rounded-tr-sm'>
                        <LuPhoneCall className='text-white text-3xl font-semibold' />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Reservation;