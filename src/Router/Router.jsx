import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";

import Login from "../components/LOgin/login";
import Contact from "../components/Contact/Contact";
import MainApp from "../components/MainAPP/MainApp";
import StoryMain from "../components/Main story/StoryMian";
const Router = createBrowserRouter([
  {
    path :"/",
    element :<Home></Home>,
    children :[
        {
        index:true,
        element: <MainApp></MainApp>
        },
        {
          path :"/login",
          element:<Login></Login>
        },
        {
          path :"/Contact",
          element :<Contact></Contact>
        },
        {
          path :"/story",
          element :<StoryMain></StoryMain>
        }
    ]
}
])
export default Router;  