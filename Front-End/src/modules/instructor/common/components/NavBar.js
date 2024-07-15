import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiHome, HiMenu, HiUser } from "react-icons/hi";

import Drawers from "./Drawers";
import MenuItems from "./MenuItems";

import { menuItems } from "../../menuItems";

const Navbar = () => {
    const location = useLocation();
    const [link, setLink] = useState(location.pathname);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    link === location.pathname ? "" : setLink(location.pathname);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <nav className="sticky top-0 bg-white shadow-md z-10">
            <div className="flex items-center justify-between px-4 py-2 md:px-6">
                <button onClick={handleDrawerToggle} className="md:hidden">
                    <HiMenu className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate("/")}
                    className={`hidden md:flex items-center ${link === "/" ? "active" : ""}`}
                >
                    <HiHome className="w-6 h-6" />
                </button>
                <div className="flex-1 flex items-center justify-center">
                    {menuItems?.map((menu, index) => (
                        <MenuItems items={menu} key={index} depthLevel={0} path="" current={link} />
                    ))}
                </div>
                <button className="md:hidden">
                    <HiUser className="w-6 h-6" />
                </button>
            </div>
            <Drawers handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </nav>
    );
};

export default Navbar;
