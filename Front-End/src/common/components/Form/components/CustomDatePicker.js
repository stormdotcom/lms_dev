import React from "react";
import { useController } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ control, name, label, mode, ...rest }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue: ""
    });

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <DatePicker
                id={name}
                selected={value ? new Date(value) : null}
                onChange={onChange}
                onBlur={onBlur}
                showTimeSelect={mode === "Date&&Time" || mode === "Time"}
                showTimeSelectOnly={mode === "Time"}
                timeIntervals={15}
                dateFormat={mode === "Time" ? "h:mm aa" : "MMMM d, yyyy h:mm aa"}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={ref}
                {...rest}
            />
            {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
        </div>
    );
};

export default CustomDatePicker;
