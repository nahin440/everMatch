import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/Nav/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div>

            <div>
                <NavBar></NavBar>
            </div>

            <div className="min-h-screen bg-[#fffbfc]" >
                <Outlet></Outlet>
            </div>

            <div>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default Main;