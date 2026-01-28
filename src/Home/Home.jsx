import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}
export default Home;