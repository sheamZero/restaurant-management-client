import { IoMenu, IoNotifications } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const DashboardHeader = ({ onMenuClick }) => {
    const { user } = useAuth();
    const { isAdmin } = useAdmin();

    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const role = isAdmin ? "Admin" : "User";

    // Close notification on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-20 py-4 bg-white border-b border-secondary shadow-sm">

            {/* LEFT */}
            <div className="flex items-center gap-3">
                {/* Mobile menu */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-3xl text-primary"
                >
                    <IoMenu />
                </button>

                <h2 className="hidden md:block text-2xl font-bold text-primary">
                    {role} Dashboard
                </h2>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 relative">
                {/* User Info */}
                <div className=" text-right">
                    <p className="font-medium text-sm">
                        {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>

                {/* Avatar */}
                <img
                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-primary object-cover"
                />

                {/* Notification */}
                <motion.button
                    whileHover={{ scale: 1.15 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden sm:block text-primary"
                >
                    <IoNotifications size={24} />
                </motion.button>

                {/* Notification popup */}
                {isOpen && (
                    <div
                        ref={popupRef}
                        className="absolute right-0 top-14 w-72 bg-white shadow-xl rounded-xl p-4 z-50"
                    >
                        <p className="text-center text-gray-500">
                            No notifications yet
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
};

export default DashboardHeader;
