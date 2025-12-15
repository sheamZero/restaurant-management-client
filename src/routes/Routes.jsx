import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import OurMenu from "../pages/OurMenu/OurMenu";
import Contact from "../pages/Contact/Contact";
import OurShop from "../pages/OurShop/OurShop/OurShop";
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";
import Reservation from "../pages/Dashboard/User/Reservation/Reservation";
import MyCart from "../pages/Dashboard/User/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import MyBooking from "../pages/Dashboard/User/MyBooking/MyBooking";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AddItems from "../pages/Dashboard/Admin/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/Admin/ManageItems/ManageItems";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings/ManageBookings";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import UpdateItem from "../pages/Dashboard/Admin/UpdateItem/UpdateItem";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>
            },
            {
                path: "/sign-in",
                element: <SignIn></SignIn>
            },
            {
                path: "/our-menu",
                element: <OurMenu></OurMenu>
            },
            {
                path: "/contact-us",
                element: <Contact></Contact>
            },
            {
                path: "/our-shop",
                element: <OurShop></OurShop>
            },
        ]
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "user",
                element: <UserHome></UserHome>
            },
            {
                path: "reservation",
                element: <Reservation></Reservation>
            },
            {
                path: "my-cart",
                element: <MyCart></MyCart>
            },
            {
                path: "my-booking",
                element: <MyBooking></MyBooking>
            },


            // admin 
            { path: "admin", element: <AdminRoute><AdminHome></AdminHome></AdminRoute> },
            { path: "admin/add-items", element: <AdminRoute><AddItems></AddItems></AdminRoute> },
            { path: "admin/all-users", element: <AdminRoute><AllUsers></AllUsers></AdminRoute> },
            { path: "admin/manage-items", element: <AdminRoute><ManageItems></ManageItems></AdminRoute> },
            { path: "admin/manage-bookings", element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute> },
            {
                path: "admin/update-item/:id",
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:9000/menu/${params.id}`)
            },
        ]
    }

])