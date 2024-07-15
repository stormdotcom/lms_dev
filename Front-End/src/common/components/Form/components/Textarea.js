import React from "react";
import { useController } from "react-hook-form";

const Textarea = ({ name, control, ...rest }) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <div className="mb-4">
      <textarea
        {...field}
        {...rest}
        value={field.value ?? ""}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
    </div>
  );
};

export default Textarea;
