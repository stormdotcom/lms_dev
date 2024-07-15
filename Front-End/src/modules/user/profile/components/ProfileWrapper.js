import React, { useEffect } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProfileWrapper = ({ children }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/details")) {
            setSelectedIndex(0);
        } else if (location.pathname.includes("/my-courses")) {
            setSelectedIndex(1);
        } else if (location.pathname.includes("/settings")) {
            setSelectedIndex(2);
        } else if (location.pathname.includes("/subscription")) {
            setSelectedIndex(3);
        } else if (location.pathname.includes("/notifications")) {
            setSelectedIndex(4);
        }
    }, [location.pathname]);

    const handleTabClick = (index, path) => {
        setSelectedIndex(index);
        navigate(path);
    };

    return (
        <div className="m-4 mt-6 grid  grid-cols-[20%,80%] gap-4 p-2">
            <div className="border-2 p-2 border-gray-300">
                <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <TabList className="flex flex-col mt-5">
                        <Tab
                            as="button"
                            className={({ selected }) =>
                                selected
                                    ? "bg-secondary text-white px-3 py-2 rounded-t text-left"
                                    : "bg-white text-secondary px-3 py-2 rounded-t text-left"
                            }
                            onClick={() => handleTabClick(0, "../../home/profile/details")}
                        >
                            Profile
                        </Tab>
                        <Tab
                            as="button"
                            className={({ selected }) =>
                                selected
                                    ? "bg-secondary text-white px-3 py-2 rounded-t text-left"
                                    : "bg-white text-secondary px-3 py-2 rounded-t text-left"
                            }
                            onClick={() => handleTabClick(1, "../../home/profile/my-courses")}
                        >
                            My Courses
                        </Tab>
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
                            onClick={() => handleTabClick(3, "../../home/profile/notifications")}
                        >
                            Notifications
                        </Tab>
                        <Tab
                            as="button"
                            className={({ selected }) =>
                                selected
                                    ? "bg-secondary text-white px-3 py-2 rounded-t text-left"
                                    : "bg-white text-secondary px-3 py-2 rounded-t text-left"
                            }
                            onClick={() => handleTabClick(4, "../../home/profile/privacy")}
                        >
                            Privacy
                        </Tab>
                    </TabList>
                </TabGroup>
            </div>
            <div className="border-2 p-2 h-[73vh] overflow-y-auto">
                <Outlet />
                {children}
            </div>
        </div>
    );
};

export default ProfileWrapper;
