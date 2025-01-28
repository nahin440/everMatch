import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  
} from "@tanstack/react-query";

const queryClient = new QueryClient();

import Root from "./Components/MainCompo/Root/Root.jsx";
import Home from "./Components/MainCompo/Home/Home.jsx";
import Contact from "./Components/MainCompo/Contact/Contact.jsx";
import About from "./Components/MainCompo/About/About.jsx";
import Biodata from "./Components/MainCompo/Biodata/Biodata.jsx";
import Login from "./Components/MainCompo/Firebase/Login.jsx";
import Register from "./Components/MainCompo/Firebase/Register.jsx";
import AuthProvider from "./Components/MainCompo/Provider/AuthProvider.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import CreateBio from "./Components/Dashboard/CreateBio/CreateBio.jsx";
import ContuctReq from "./Components/Dashboard/ContactReq/ContuctReq.jsx";
import Favourate from "./Components/Dashboard/Favourate/Favourate.jsx";
import Editbio from "./Components/Dashboard/EditBio/Editbio.jsx";
import ViewData from "./Components/Dashboard/ViewBioData/ViewData.jsx";
import Checkout from "./Components/Dashboard/ViewBioData/Checkout.jsx";
import MyBio from "./Components/Dashboard/EditBio/MyBio.jsx";
import GotMarried from "./Components/Dashboard/GotMarried/GotMarried.jsx";
import ManageUser from "./Components/Dashboard/ManageUser/ManageUser.jsx";
import ContuctApproved from "./Components/Dashboard/AdminContuct/ContuctApproved.jsx";
import AdminHome from "./Components/Dashboard/AdminHome/AdminHome.jsx";
import Premimum from "./Components/Dashboard/Premium/Premimum.jsx";
import AdminRoute from "./Components/MainCompo/Provider/AdminRoute.jsx";
import PrivateRoute from "./Components/MainCompo/Biodata/privateRoute/PrivateRoute.jsx";
import SuccesstoryTable from "./Components/Dashboard/AdminSucces/SuccesstoryTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/checkout/:id",
        element: <Checkout></Checkout>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/biodata/${params.id}`),
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/biodata",
        element: <Biodata></Biodata>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/view/:id",
        element: <PrivateRoute><ViewData></ViewData></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/biodata/${params.id}`),
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "/dashboard/create",
        element: <PrivateRoute><CreateBio></CreateBio></PrivateRoute>,
      },
      {
        path: "/dashboard/edit",
        element: <PrivateRoute><Editbio></Editbio></PrivateRoute>,
      },
      {
        path: "/dashboard/mybio",
        element: <PrivateRoute><MyBio></MyBio></PrivateRoute>
      },
      {
        path: "/dashboard/gotmarried",
        element: <PrivateRoute><GotMarried></GotMarried></PrivateRoute>
      },
      {
        path: "/dashboard/contact",
        element: <PrivateRoute><ContuctReq></ContuctReq></PrivateRoute>,
      },
      {
        path: "/dashboard/favourate",
        element: <PrivateRoute><Favourate></Favourate></PrivateRoute>,
      },
      {
        path: "/dashboard/edit/:id",
        element: <PrivateRoute><Editbio></Editbio></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/biodata/${params.id}`),
      },

      // admin route 
      {
        path: '/dashboard/manageuser',
        element: <AdminRoute>
          <PrivateRoute><ManageUser></ManageUser></PrivateRoute>
        </AdminRoute>
      },
      {
        path: '/dashboard/adminhome',
        element: <AdminRoute>
          <PrivateRoute><AdminHome></AdminHome></PrivateRoute>
        </AdminRoute>
      },
      {
        path: '/dashboard/admincontact',
        element: <AdminRoute>
          <PrivateRoute><ContuctApproved></ContuctApproved></PrivateRoute>
        </AdminRoute>
      },
      {
        path: '/dashboard/premium',
        element: <AdminRoute> 
          <PrivateRoute><Premimum></Premimum></PrivateRoute>
        </AdminRoute>
      },
      {
        path: "/dashboard/story",
        element: <AdminRoute> 
          <PrivateRoute><SuccesstoryTable></SuccesstoryTable></PrivateRoute>
        </AdminRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
      ,
    </AuthProvider>
  </QueryClientProvider>
);
