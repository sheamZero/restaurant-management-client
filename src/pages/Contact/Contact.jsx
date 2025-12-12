import bg_img from '../../assets/contact/banner.jpg';
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaClock, FaRegClock } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useForm } from 'react-hook-form';
import Cover from '../components/Cover/Cover';
import SectionTitle from '../components/SectionTitle/SectionTitle';

const Contact = () => {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div>
            <section>
                <Cover bg_img={bg_img} title={"contact us"} subTitle={"Get in touch with our team for any inquiries or support."}></Cover>
            </section>

            <section className='my-20'>
                <SectionTitle title='our location' subTitle='Visit Us'></SectionTitle>

                <div className='flex flex-col md:flex-row justify-between my-10'>

                    <div className='p-6 md:min-w-[360px] md:p-8 border relative rounded'>
                        <div className='py-24 w-full flex flex-col items-center justify-center bg-[#F3F3F3] rounded'>
                            <p className='text-2xl font-medium py-6 uppercase'>Phone</p>
                            <p className='text-sm opacity-80 md:text-base '>01909-758810</p>
                        </div>
                        <div className='absolute top-0 left-0 bg-[#D1A054] w-full h-20 flex items-center justify-center rounded-tl-sm rounded-tr-sm'>
                            <IoLocationOutline className='text-white text-3xl font-semibold'></IoLocationOutline>
                        </div>
                    </div>
                    <div className='p-6 md:min-w-[360px] md:p-8 border relative rounded'>
                        <div className='py-24 w-full flex flex-col items-center justify-center bg-[#F3F3F3] rounded'>
                            <p className='text-2xl font-medium py-6 uppercase'>Address</p>
                            <p className='text-sm opacity-80 md:text-base '>xxxx-xxxx-xxxx</p>
                        </div>
                        <div className='absolute top-0 left-0 bg-[#D1A054] w-full h-20 flex items-center justify-center rounded-tl-sm rounded-tr-sm'>
                            <FaClock className='text-white text-3xl font-semibold'></FaClock>
                        </div>
                    </div>
                    <div className='p-6 md:min-w-[360px] md:p-8 border relative rounded'>
                        <div className='py-24 w-full flex flex-col items-center justify-center bg-[#F3F3F3] rounded'>
                            <p className='text-2xl font-medium py-6 uppercase'>working hours</p>
                            <p className='text-sm opacity-80 md:text-base '>Mon-Fri : 10am-12pm</p>
                            <p className='text-sm opacity-80 md:text-base '>Sat-Sun : 10am-12pm</p>
                        </div>
                        <div className='absolute top-0 left-0 bg-[#D1A054] w-full h-20 flex items-center justify-center rounded-tl-sm rounded-tr-sm'>
                            <LuPhoneCall className='text-white text-3xl font-semibold'></LuPhoneCall>
                        </div>
                    </div>

                </div>

            </section>
            {/* contact form */}
            <section className='my-20'>
                <SectionTitle title='contact form' subTitle='Send a Message'></SectionTitle>


                <div className="min-h-screen w-full bg-[#F3F3F3] flex items-center justify-center mt-10 px-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="rounded-lg p-8 md:p-12 w-full max-w-5xl">

                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", { required: true })}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", { required: true })}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                                />
                            </div>
                        </div>

                        {/* Row 2: Phone Number */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register("phone", { required: true })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                        </div>

                        {/* Row 3: Message */}
                        <div className="mb-8">
                            <label className="block text-gray-700 font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                rows="5"
                                placeholder="Write your message here..."
                                {...register("message", { required: true })}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-[#D1A054] flex items-center gap-5 text-white font-semibold px-8 py-3 rounded-md hover:bg-[#b88845] transition-all"
                            >
                                Send Message
                                <IoIosSend className='text-2xl'></IoIosSend>
                            </button>

                        </div>
                    </form>
                </div>

            </section>

        </div>
    );
};

export default Contact;