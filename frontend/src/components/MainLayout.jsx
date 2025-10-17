import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../App.css";

function MainLayout() {
    return (
        <div className="app-layout">
            <NavBar />
            <div className="content-area">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;


