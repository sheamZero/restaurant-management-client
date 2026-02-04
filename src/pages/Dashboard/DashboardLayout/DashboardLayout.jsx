import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import useAdmin from "../../../hooks/useAdmin";
import { NavLink, Outlet } from "react-router-dom";
import { CiCreditCard1 } from "react-icons/ci";
import { FaBookmark, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { MdHome, MdMail, MdPayment, MdReviews } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";



const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isAdmin } = useAdmin();

    const navLinks = (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
                    }
                >
                    <FaShoppingCart />
                    My Cart
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="payment-history"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-primary" : "text-black"}`
                    }
                >
                    <MdPayment />
                    Payment History
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="add-review"
                    className={({ isActive }) =>
                        `flex items-center gap-3 text-lg font-semibold rounded-md transition-all duration-300
          ${isActive ? "text-primary font-bold" : "text-black"}`
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
          ${isActive ? "text-primary font-bold" : "text-black"}`
                    }
                >
                    <FaBookmark />
                    My Booking
                </NavLink>
            </li>
        </ul>
    );

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                isAdmin={isAdmin}
                adminNavLinks={adminNavLinks}
                userNavLinks={userNavLinks}
                navLinks={navLinks}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex flex-col flex-1  min-w-0">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto overflow-x-auto bg-backgroundcolor p-4 md:py-6 lg:px-20">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
