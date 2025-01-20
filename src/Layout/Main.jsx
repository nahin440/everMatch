import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/Nav/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


const Main = () => {
    return (
        <div>

            <div>
                <NavBar></NavBar>
            </div>

            <div className="min-h-screen bg-[#fff7e3]" >
                <Outlet></Outlet>
            </div>

            <div>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default Main;