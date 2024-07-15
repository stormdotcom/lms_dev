
import { Outlet } from "react-router-dom";
import CommonSidebar from "./common/components/CommonSideBar";
import { menuItems } from "./menuItems";
function InstructorHome() {

    return (
        <div className="flex">
            <div className="w-73">
                <CommonSidebar menuItems={menuItems} title="Instructor Dashboard" />
            </div>
            <div className="flex-1 p-6 transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
}

export default InstructorHome;
