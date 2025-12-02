import React, { SetStateAction } from "react";

type TextInputProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  focus: string;
  setFocus: React.Dispatch<SetStateAction<string>>;
  title: string;
  id: string;
  children?: React.ReactNode;
  type: string;
};

export default function TextInput({
  value,
  setValue,
  focus,
  setFocus,
  title,
  id,
  children,
  type = "text",
}: TextInputProps) {
  return (
    <label htmlFor={id} className="w-full">
      <p
        className={`font-bold text-slate-500 transition-all duration-400 ${
          focus === id ? "-translate-y-1" : null
        }`}
      >
        {title}
      </p>
      <div className="relative before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-slate-300">
        {children}
        <input
          id={id}
          type={type}
          value={value}
          onFocus={(e) => {
            e.preventDefault();
            setFocus(id);
          }}
          onBlur={(e) => {
            e.preventDefault();
            setFocus("");
          }}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          className="w-full focus:outline-none p-1 bg-transparent text-lg!"
        />
      </div>
    </label>
  );
}
