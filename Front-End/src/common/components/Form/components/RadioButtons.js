import React from "react";
import { useController } from "react-hook-form";

const RadioButtons = ({ control, name, label, options, ...rest }) => {
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
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        className="form-radio"
                        {...rest}
                    />
                    <span className="text-gray-700">{option.name}</span>
                </label>
            ))}
            {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
        </div>
    );
};

export default RadioButtons;
