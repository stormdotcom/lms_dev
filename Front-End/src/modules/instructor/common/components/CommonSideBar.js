import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const CommonSidebar = ({ menuItems, title = "" }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div>
            <div className="relative">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-2 right-1 bg-white text-secondary p-2 rounded"
                >
                    <HiOutlineMenuAlt1 className="w-5 h-5" />
                </button>
                {title && (
                    <div className="px-1 text-center py-2 mr-6">
                        <p className="text-lg font-bold text-secondary text-center">
                            {title}
                        </p>
                    </div>
                )}
            </div>
            <Sidebar collapsed={collapsed} className="h-[83vh] bg-white">
                <Menu
                    className="p-2 text-center"
                    menuItemStyles={{
                        button: () => ({
                            borderColor: "#4a4a4a",
                            borderWidth: "1px",
                            padding: "8px 16px", // Tailwind's py-2 px-4
                            marginBottom: "1.5rem", // Tailwind's mb-2
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                backgroundColor: "#5C5C5D",
                                color: "#fff"
                            }
                        })
                    }}
                >
                    {menuItems.map((item, index) => {
                        if (item.subMenu && item.subMenu.length > 0) {
                            return (
                                <SubMenu
                                    icon={<item.icon className="w-5 h-5 mr-2" />}
                                    className="relative text-left pl-4 overflow-x-auto"
                                    label={item.title}
                                    key={index}
                                >
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <MenuItem
                                            key={subIndex}
                                            component={<Link to={subItem.path} />}
                                            icon={
                                                subItem.icon && (
                                                    <subItem.icon className="w-5 h-5 mr-2" />
                                                )
                                            }
                                            className={`pl-8 ${isActive(subItem.path) ? "bg-white text-grey-300 font-bold" : ""}`}
                                        >
                                            {subItem.title}
                                        </MenuItem>
                                    ))}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary mb-1"></div>
                                </SubMenu>
                            );
                        }
                        return (
                            <MenuItem
                                className={`text-secondary ${isActive(item.path) ? "bg-white text-secondary font-bold" : ""}`}
                                key={index}
                                component={<Link to={item.path} />}
                                icon={
                                    item.icon && (
                                        <item.icon className="w-5 h-5 mr-2" />
                                    )
                                }
                            >
                                {item.title}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Sidebar>
        </div>
    );
};

export default CommonSidebar;
