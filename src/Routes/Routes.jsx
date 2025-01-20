import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
  
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element:<Home></Home>
        },
        {
          path: 'biodatas',
          element:<BiodatasPage></BiodatasPage>
        },
        {
          path: 'login',
          element:<Login></Login>
        },
        {
          path: 'register',
          element:<Register></Register>
        },
      ]
    },
  ]);