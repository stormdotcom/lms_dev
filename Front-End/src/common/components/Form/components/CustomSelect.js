import React from "react";
import Select from "react-select";
import { useController } from "react-hook-form";

const CustomSelect = ({ name, control, options, multiple = false, label = "", onChangeFromController, disabled = false, ...rest }) => {
  const { field, fieldState } = useController({ name, control });

  // Map options to the format expected by react-select
  const formattedOptions = options.map(option => ({ label: option, value: option }));

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-secondary mb-1">
        {label}
      </label>
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "1px solid blue",
            boxShadow: "none",
            borderRadius: "0.375rem",
            paddingX: "0.1rem",
            paddingY: "0.5rem",
            "&:hover": {
              borderColor: "blue"
            }
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "0.875rem",
            lineHeight: "1.05rem",
            backgroundColor: state.isSelected ? "#be32f5" : state.isFocused ? "#e5b3ff" : "white",
            color: state.isSelected ? "white" : "#4a4a4a",
            "&:hover": {
              backgroundColor: "#e5b3ff",
              color: "#4a4a4a"
            }
          }),
          multiValue: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#e5b3ff",
            color: "#4a4a4a"
          }),
          multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: "#ffff",
            fontSize: "0.875rem",
            lineHeight: "0.95rem"
          }),
          multiValueRemove: (baseStyles) => ({
            ...baseStyles,
            color: "#4a4a4a",
            "&:hover": {
              backgroundColor: "#be32f5",
              color: "white"
            }
          })
        }}
        {...field}
        {...rest}
        id={name}
        options={formattedOptions}
        value={field.value}
        onChange={(selectedOptions) => {
          const value = multiple ? selectedOptions.map(option => option.value) : selectedOptions.value;
          onChangeFromController && onChangeFromController(value);
          field.onChange(selectedOptions);
        }}
        isDisabled={disabled}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        isMulti={multiple}
        name={name}
      />
      {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
    </div>
  );
};

export default CustomSelect;
