import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Dropdown from "./DropDown";

const MenuItems = ({ items, depthLevel, path, current }) => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
    const [link, setLink] = useState("/");

    let ref = useRef();
    let paths = path + "/" + items.path;

    useEffect(() => {
        setLink(paths);
    }, [paths]);

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        setDropdown(true);
    };

    const onMouseLeave = () => {
        setDropdown(false);
    };

    const navigator = () => {
        navigate(link);
    };

    let active = current && current.includes(items.path) ? "active" : "";

    if (!items.title) {
        return null;
    }

    return (
        <div
            ref={ref}
            className={`relative ${depthLevel === 0 ? "py-2 px-4" : "py-1 px-2"} ${active} ${depthLevel > 0 ? "bg-gray-100" : ""}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {items.title && items.children ? (
                <>
                    <button
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => navigate(link)}
                        className="flex items-center w-full text-left"
                    >
                        {items.title}
                        <img src={current && current.includes(items.path) ? HiChevronDown : HiChevronUp} alt="expand" className="ml-auto" />
                    </button>
                    <Dropdown depthLevel={depthLevel} submenus={items.children} dropdown={dropdown} path={items.path} />
                </>
            ) : (
                <button onClick={navigator} className="w-full text-left">
                    {items.title}
                </button>
            )}
        </div>
    );
};

export default MenuItems;
