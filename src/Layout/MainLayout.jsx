import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <div className="bg-[#fffff8]" >

            <Outlet></Outlet>

            </div>
            


            <Footer></Footer>
        </div>
    );
};

export default MainLayout;