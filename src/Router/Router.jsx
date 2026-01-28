import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import App from "../App";
import Bbody from "../components/Main/Body";
import Login from "../components/LOgin/login";
const Router = createBrowserRouter([
  {
    path :"/",
    element :<Home></Home>,
    children :[
        {
        index:true,
        element: <Bbody></Bbody>
        },
        {
          path :"/login",
          element:<Login></Login>
        }
    ]
}
])
export default Router;  