import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel, path }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (
        <div className={`absolute left-0 mt-2 z-50 ${dropdownClass} ${dropdown ? "block" : "hidden"} max-h-50 overflow-auto`}>
            {submenus.map((submenu, index) => (
                <MenuItems items={submenu} key={index} depthLevel={depthLevel} path={path} />
            ))}
        </div>
    );
};

export default Dropdown;
