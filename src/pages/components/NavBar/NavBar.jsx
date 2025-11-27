import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../../hooks/useAuth";
import { CiShoppingCart } from "react-icons/ci";
import { useGetAllCart } from "../../../hooks/useCart";

const NavBar = () => {
  // const user = false;
  const { user, signoutUser } = useAuth();
  const {data:cartItems =[]} = useGetAllCart(user?.email);
  console.log(cartItems);


  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 ${isActive ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white "
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/our-menu"
          className={({ isActive }) =>
            `text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 ${isActive ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white "
            }`
          }
        >
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/our-shop"
          className={({ isActive }) =>
            `text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 ${isActive ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white "
            }`
          }
        >
          Our Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            `text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 ${isActive ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white "
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-[#151515]/50 text-white font-semibold max-w-screen-xl fixed z-50 px-4">
      {/* Left section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          {/* ✅ Mobile dropdown */}
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        {/* ✅ Logo (hidden on mobile) */}
        <div className="hidden md:flex">
          <div className="flex gap-1 items-center">
            <img className="w-auto h-10" src={logo} alt="Logo" />
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold tracking-[5px]">TableTalk</p>
              <p className="font-semibold text-2xl">Restaurant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Center nav links (desktop only) */}
      <div className="navbar-center hidden md:flex">
        <ul className="flex items-center gap-6">{navLinks}</ul>
      </div>

      {/* Right section (profile / login) */}
      <div className="navbar-end">
        {/* dashboard */}
        <Link
          title="Dashboard"
          className="flex items-center justify-center mr-5 p-1 relative hover:text-yellow-500"
        >
          <CiShoppingCart className="text-4xl font-extrabold"></CiShoppingCart>
          <div className="badge bg-yellow-500 badge-xs absolute bottom-0 right-0 font-bold">{cartItems.length}</div>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link onClick={signoutUser}>Signout</Link>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full" title="">
                <img referrerPolicy="no-referrer" alt="User Profile Photo" src={user?.photoURL} title={user?.displayName} />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-5">
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
