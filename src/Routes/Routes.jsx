import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Layout/Dashboard";
import Favourites from "../Pages/favourites/Favourites";
import EditBiodata from "../Pages/EditBiodata/EditBiodata";
import BiodataView from "../Pages/BiodataView/BiodataView";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'biodatas',
        element: <BiodatasPage></BiodatasPage>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'About',
        element: <AboutUs></AboutUs>
      },
      {
        path: 'contact',
        element: <ContactUs></ContactUs>
      },

    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      
      
      {
        path: 'favourites',
        element: <Favourites></Favourites>
      },
      {
        path: 'edit',
        element: <EditBiodata></EditBiodata>
      },
      {
        path: 'profile',
        element: <BiodataView></BiodataView>
      },
      
    ]
  },
]);