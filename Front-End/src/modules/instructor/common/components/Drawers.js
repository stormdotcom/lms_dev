/* eslint-disable brace-style */
import { useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { menuItems } from "../../menuItems";


export default function Drawers({ handleDrawerToggle, mobileOpen }) {
    const navigate = useNavigate();

    return (
        <div className={`fixed inset-0 z-40 ${mobileOpen ? "block" : "hidden"} md:hidden`}>
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleDrawerToggle}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md">
                <button
                    onClick={handleDrawerToggle}
                    className="m-2"
                >
                    <HiX className="w-6 h-6" />
                </button>
                <nav className="p-4">
                    {menuItems?.map((item) => (
                        <button key={item.title} className="w-full text-left py-2" onClick={() => { navigate(item.path); handleDrawerToggle(); }}>
                            {item.title}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
