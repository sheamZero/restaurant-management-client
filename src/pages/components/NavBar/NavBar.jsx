import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useGetAllCart } from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import Container from "../Container/Container";
import { BsCartCheckFill } from "react-icons/bs";


const NavBar = () => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const { user, signoutUser } = useAuth();
  const { data: cartItems = [] } = useGetAllCart();

  const dashboardPath = user
    ? isAdmin
      ? "/dashboard/admin"
      : "/dashboard"
    : "/sign-in";

  const navLinks = (
    <>
      {[
        { path: "/", label: "Home" },
        { path: "/our-menu", label: "Our Menu" },
        { path: "/our-shop", label: "Our Shop" },
        { path: "/contact-us", label: "Contact Us" },
      ].map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 ${isActive
                ? "text-primary"
                : "text-black lg:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );

  const authLinks = (
    <>
      <div className="flex flex-col text-sm md:text-base mt-2 lg:text-lg font-medium items-start p-2  border-t-[1px] ">
        <Link to="/sign-in" className="hover:cursor-pointer">
          Sign In
        </Link>
        <Link to="/sign-up"
          className="hover:cursor-pointer">
          Sign Up
        </Link>
      </div>
    </>
  )

  if (isAdminLoading) return null;

  return (
    /* Full width fixed navbar background */
    <nav className="fixed top-0 left-0 w-full bg-[#151515]/50 backdrop-blur z-50">
      <Container>
        <div className="navbar text-white font-semibold px-0">
          {/* Left */}
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow z-10 text-black"
              >
                {navLinks}
                {authLinks}
              </ul>

            </div>

            {/* Logo */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="flex flex-col bg leading-none">
                <p className="font-bold tracking-[5px]">TableTalk</p>
                <p className="font-semibold text-2xl">Restaurant</p>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-6">{navLinks}</ul>
          </div>

          {/* Right */}
          <div className="navbar-end flex items-center gap-3">
            {/* Cart / Dashboard */}
            <Link
              to={"/dashboard/my-cart"}
              title="Dashboard"
              className="relative hover:text-primary"
            >
              <BsCartCheckFill className="text-3xl" />
              {user && (
                <span className="badge badge-xs bg-primary text-white absolute bottom-0 right-0">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3 relative ">
                <button onClick={signoutUser} className="hover:text-teal-dark">
                  Signout
                </button>

                {/* Avatar with Hover Dropdown */}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar relative group"
                >
                  <div className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      src={user?.photoURL}
                      alt="User"
                      title={user?.displayName}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  <ul
                    className="menu menu-sm absolute right-0 top-2 p-4 mt-12 w-44 bg-base-100 rounded-box shadow-lg z-20 opacity-0 invisible  group-hover:opacity-100 group-hover:visible transition-all duration-200 text-black capitalize"
                  >
                    <li>
                      <Link to={dashboardPath}>Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-5">
                <Link to="/sign-in" className="hover:cursor-pointer">
                  Sign In
                </Link>
                <Link to="/sign-up"
                  className="border border-primary text-primary px-3 py-1 rounded-3xl hover:bg-primary hover:text-white transition-colors  duration-300">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
