import { NavLink, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { MdHome, MdMail, MdPayment, MdReviews } from "react-icons/md"; 
import { IoMdMenu } from "react-icons/io";
import { FaBookmark, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import useAdmin from "../../../hooks/useAdmin";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
    // const isAdmin = true;
    const { isAdmin } = useAdmin();
    // console.log(isAdmin);



    const navLinks = (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
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
          ${isActive ? "text-white font-bold" : "text-black"}`
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
          ${isActive ? "text-white font-bold" : "text-black"}`
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
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdMail />
                    Contact Us
                </NavLink>
            </li>
        </ul>
    );

    const adminNavLinks = (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to="admin"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    Admin Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="admin/add-items"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    Add Items
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="admin/manage-items"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    Manage Items
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="admin/manage-bookings"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    Manage Bookings
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="admin/all-users"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdHome className="text-2xl" />
                    All User
                </NavLink>
            </li>



        </ul>
    );

    const userNavLinks = (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to="user"
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
          ${isActive ? "text-white font-bold" : "text-black"}`
                    }
                >
                    <MdReviews />
                    Add Review
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="my-booking"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-white font-bold" : "text-black"}`
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
            <nav id="dashboard-sidebar" className="bg-primary md:w-1/4 lg:w-1/5 min-h-screen overflow-hidden top-0 left-0 fixed md:flex flex-col px-6 py-10 hidden">
                <div className="flex items-center gap-2">
                    <img className="w-auto h-12" src={logo} alt="Logo" />
                    <div>
                        <p className="font-bold tracking-[3px] text-white">TableTalk</p>
                        <p className="font-semibold text-xl text-sky">Restaurant</p>
                    </div>
                </div>

                <div className="mt-16">
                    {
                        isAdmin ? adminNavLinks : userNavLinks
                    }
                </div>


                <div className="divider divider-primary"></div>
                <div>
                    {navLinks}
                </div>
            </nav>



            {/* MAIN CONTENT */}
            <section className="flex-1 min-h-screen p-10 bg-sky/20 md:ml-[24%]">
                <DashboardHeader />
                <div className="p-6 md:p-10">
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

