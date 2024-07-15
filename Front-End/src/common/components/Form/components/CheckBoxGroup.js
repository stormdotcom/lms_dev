import React from "react";
import { useController } from "react-hook-form";

const CheckboxGroup = ({ control, name, label, options = [], multiple = false, ...rest }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue: multiple ? [] : false
    });

    const handleChange = (optionValue) => {
        if (multiple) {
            const newValue = value.includes(optionValue)
                ? value.filter((v) => v !== optionValue)
                : [...value, optionValue];
            onChange(newValue);
        } else {
            onChange(optionValue);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={multiple ? value.includes(option.value) : value === option.value}
                        onChange={() => handleChange(option.value)}
                        onBlur={onBlur}
                        ref={ref}
                        className="form-checkbox"
                        {...rest}
                    />
                    <span className="text-gray-700">{option.name}</span>
                </label>
            ))}
            {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
        </div>
    );
};

export default CheckboxGroup;
