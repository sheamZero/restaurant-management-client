import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/components/NavBar/NavBar";
import Footer from "../pages/components/Footer/Footer";



const Main = () => {
    const location = useLocation();
    const isLoginOrRegister = location.pathname.includes("sign-in") || location.pathname.includes("sign-up");
    // console.log(isLoginOrRegister);
    return (
        <div >
            {!isLoginOrRegister && <NavBar />}
  
            <Outlet />

            {!isLoginOrRegister && <Footer />}

        </div>
    );
};

export default Main;