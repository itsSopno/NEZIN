import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";

import Login from "../components/LOgin/login";
import Contact from "../components/Contact/Contact";
import MainApp from "../components/MainAPP/MainApp";
import StoryMain from "../components/Main story/StoryMian";
import MenMain from "../MEN Component/Main/MenMain";
import Hero1 from "../MEN Component/Page1/page";
import WomenMain from "../Women Component/WomenMain/womenMain";
import Heroin1 from "../Women Component/Women/Heroin1";
import MenGallery from "../MEN Component/Aesthetic/Aesthetic";
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
},
{
  path :"/men",
  element : <MenMain></MenMain>,
  children :[
    {
      index : true ,
      element : <Hero1></Hero1>
    },
    {
      path :"aesthetic",
      element : <MenGallery></MenGallery>
    }
  ]
},
{
  path :"/women",
  element : <WomenMain></WomenMain>,
  children :[
    {
      index : true ,
      element : <Heroin1></Heroin1>
    }
  ]
}
])
export default Router;  