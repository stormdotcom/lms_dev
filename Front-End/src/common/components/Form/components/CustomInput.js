import React from "react";
import { useController } from "react-hook-form";

const CustomInput = ({ name, label, control, readOnly = false, ...rest }) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-secondary mb-1">{label}</label>
      <input
        {...field}
        {...rest}
        readOnly={readOnly}
        value={field.value ?? ""}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
    </div>
  );
};

export default CustomInput;
