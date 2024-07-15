import React from "react";
import classNames from "classnames";
import { ClockLoader } from "react-spinners";

const Button = ({
    children,
    loader = false,
    active = true,
    onClick,
    disabled = false,
    variant = "contained-secondary",
    extraClass = "",
    sx = { fontWeight: 600 },
    ...rest
}) => {
    // Define base and variant classes
    const baseClasses = `font-bold py-2 rounded-lg focus:outline-none focus:shadow-outline ${extraClass}`;
    const variantClasses = {
        "contained-primary": "bg-primary text-white hover:bg-primary flex",
        "contained-secondary": "bg-secondary text-white hover:bg-secondary flex",
        "bordered-primary": "border border-primary text-primary hover:bg-primary-light hover:text-white hover:bg-primary flex",
        "bordered-secondary": "border border-secondary text-secondary hover:bg-secondary-light hover:text-white flex"
    };

    const responsiveClasses = "px-8 sm:px-6 xs:px-4 py-2 sm:py-1.5 xs:py-1";

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={sx}
            className={classNames(baseClasses, variantClasses[variant], responsiveClasses)}
            {...rest}
        >
            {loader && active && (
                <ClockLoader
                    size={window.innerWidth <= 576 ? 14 : 21} // Change size based on screen width
                    color={"#ffffff"}
                    cssOverride={{ position: "relative", left: -5 }}
                />
            )}
            {children}
        </button>
    );
};

export default Button;
