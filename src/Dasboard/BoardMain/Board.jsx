import React from "react";
import AdminSidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
 
const Board = () => {
    return(
        <>
        <AdminSidebar></AdminSidebar>
        <Outlet></Outlet>
        </>
    )
}
export default Board