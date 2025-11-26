import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import OurMenu from "../pages/OurMenu/OurMenu";
import Contact from "../pages/Contact/Contact";
import OurShop from "../pages/OurShop/OurShop/OurShop";


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
    }

])