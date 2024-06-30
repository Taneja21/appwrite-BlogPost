import React from "react";

const Input = React.forwardRef(function Input(
  { type = "text", className = "", label, ...props },
  ref
) {
  const id = React.useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
