import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Biodatas from "../pages/Home/Biodatas/Biodatas";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "../router/PrivateRoute";
import AdminRoute from "../router/AdminRoute";
import AllUsers from "../pages/Dashboard/AllUsers";
import EditBiodata from "../pages/EditBiodata";
import ViewBiodata from "../pages/ViewBiodata";
import MyContactRequests from "../pages/MyContactRequests";
import MyFavourites from "../pages/MyFavourites";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ApprovedPremium from "../pages/Dashboard/ApprovedPremium";
import BiodataDetails from "../pages/BiodataDetails";
import Checkout from "../pages/Dashboard/Checkout";
import ApprovedConatct from "../pages/Dashboard/ApprovedConatct";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import SuccessStories from "../components/SuccessStories";
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/biodatas',
          element: <Biodatas></Biodatas>
      },
      {
        path: '/success-story',
          element: <AdminRoute><SuccessStories></SuccessStories></AdminRoute>
      },
      {
        path: '/aboutus',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/contactus',
        element: <ContactUs></ContactUs>
      },
      {
        path:'/biodatadetail/:id',
        element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://evermatch-server.vercel.app/biodatadetail/${params.id}`),
      },
      {
        path: '/checkout/:biodataId',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
    },
    //   {
    //     path: '/biodatas/:id',
    //     element: (<PrivateRoute><MarathonDetails></MarathonDetails></PrivateRoute>),
    //     loader: ({ params }) => fetch(`https://merathon-server.vercel.app/merathon/${params.id}`),
    // },
    //   {
    //     path: '/dashboard',
    //     element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    // },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
      ]

    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'manage',
          element: <AllUsers></AllUsers>,
        },
        {
          path: 'admindashboard',
          element: <AdminDashboard></AdminDashboard>,
        },
        {
          path: 'userdashboard',
          element: <UserDashboard></UserDashboard>,
        },
        {
          path: '/dashboard/approvedPremium',
          element: <ApprovedPremium></ApprovedPremium>,
        },
        {
          path: '/dashboard/approvedContact',
          element: <ApprovedConatct></ApprovedConatct>,
        },
        {
          path: 'editbiodata',
          element: <EditBiodata></EditBiodata>,
        },
        {
          path: 'viewbiodata',
          element: <ViewBiodata></ViewBiodata>,
        },
        {
          path: 'mycontactrqst',
          element: <MyContactRequests></MyContactRequests>,
        },
        {
          path: 'myfavourites',
          element: <MyFavourites></MyFavourites>,
          loader: ({ params }) => fetch(`https://evermatch-server.vercel.app/myfavourites/${params.email}`),
        }
      ]
    },

  ]);
  