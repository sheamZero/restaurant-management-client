import { IoClose, IoLogOut } from "react-icons/io5";
import { useAuth } from "../../../hooks/useAuth";

const DashboardSidebar = ({ isOpen, onClose, isAdmin, adminNavLinks, userNavLinks, navLinks }) => {
    const { signoutUser } = useAuth();
    return (
        <>
            {/* Overlay (Mobile Only) */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            <aside
                className={`
          fixed lg:static z-50
          h-screen w-64
          bg-white text-primary
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Mobile Close */}
                <div className="lg:hidden flex justify-end p-4">
                    <button onClick={onClose} className="text-2xl">
                        <IoClose />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex items-center justify-center gap-3 px-6 pb-6 border-b border-backgroundcolor">
                    <div>
                        <p className="font-bold text-lg tracking-[0.3rem]">TableTalk</p>
                        <p className="text-2xl text-sky font-semibold">Restaurant</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-6 py-6 space-y-6 text-sm">
                    {isAdmin ? adminNavLinks : userNavLinks}

                    <div className="border-t border-b border-backgroundcolor py-6">
                        {navLinks}
                    </div>
                    <div onClick={signoutUser} className="bottom-2 left-0 hidden lg:flex w-full py-6 absolute">
                        <button className="w-full flex items-center text-lg justify-center gap-2 py-3 bg-primary rounded-xl text-backgroundcolorwhite uppercase font-medium text-center hover:bg-btnHover transition-all">
                            <span>logout</span>
                            <IoLogOut className="text-2xl"></IoLogOut>
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default DashboardSidebar;
