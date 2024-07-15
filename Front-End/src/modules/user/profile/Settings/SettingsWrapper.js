import React, { useEffect } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SettingsWrapper = ({ children }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/settings")) {
            setSelectedIndex(0);
        } else if (location.pathname.includes("/change-password")) {
            setSelectedIndex(1);
        }
    }, [location.pathname]);

    const handleTabClick = (index, path) => {
        setSelectedIndex(index);
        navigate(path);
    };

    return (
        <div className="m-1 p-2">
            <div className="p-2 border-gray-300">
                <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <TabList className="border-2 mt-5">
                        <Tab
                            as="button"
                            className={({ selected }) =>
                                selected
                                    ? "bg-secondary text-white px-3 py-2 rounded-t text-left"
                                    : "bg-white text-secondary px-3 py-2 rounded-t text-left"
                            }
                            onClick={() => handleTabClick(2, "../../home/profile/settings")}
                        >
                            Settings
                        </Tab>
                        <Tab
                            as="button"
                            className={({ selected }) =>
                                selected
                                    ? "bg-secondary text-white px-3 py-2 rounded-t text-left"
                                    : "bg-white text-secondary px-3 py-2 rounded-t text-left"
                            }
                            onClick={() => handleTabClick(1, "../../home/profile/change-password")}
                        >
                            Change Password
                        </Tab>

                    </TabList>
                </TabGroup>
            </div>
            <div className=" p-2">
                <Outlet />
                {children}
            </div>
        </div>
    );
};

export default SettingsWrapper;
