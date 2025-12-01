import { NavLink, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { MdHome, MdMail, MdPayment, MdReviews } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaBookmark, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";


const DashboardLayout = () => {

    const navLinks = (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/our-menu"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <IoMdMenu />
                    Our Menu
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/our-shop"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <FaShoppingBag />
                    Our Shop
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <MdMail />
                    Contact Us
                </NavLink>
            </li>
        </ul>
    );

    const userNavLinks = (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to=""
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    User Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="reservation"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <CiCreditCard1 />
                    Reservation
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="my-cart"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <FaShoppingCart />
                    My Cart
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <MdPayment />
                    Payment History
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <MdReviews />
                    Add Review
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white bg-black" : "text-black"}`
                    }
                >
                    <FaBookmark />
                    My Booking
                </NavLink>
            </li>
        </ul>
    );


    return (
        <div className="flex">
            {/* LEFT SIDEBAR */}
           <nav className="bg-[#D1A054] w-1/5 h-screen top-0 fixed  flex flex-col px-6 py-10">

                <div className="flex items-center gap-2">
                    <img className="w-auto h-12" src={logo} alt="Logo" />
                    <div>
                        <p className="font-bold tracking-[3px] text-black">TableTalk</p>
                        <p className="font-semibold text-xl text-black">Restaurant</p>
                    </div>
                </div>

                <div className="mt-16">
                    {userNavLinks}
                </div>


                <div className="divider divider-primary"></div>
                <div>
                    {navLinks}
                </div>
            </nav>



            {/* MAIN CONTENT */}
            <section className="flex-1 p-10 bg-[#F7F7F7] ml-[24%]">
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default DashboardLayout;
