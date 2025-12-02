import React, { SetStateAction } from "react";

type TextAreaProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  focus: string;
  setFocus: React.Dispatch<SetStateAction<string>>;
  title: string;
  id: string;
  children?: React.ReactNode;
};

export default function TextArea({
  value,
  setValue,
  focus,
  setFocus,
  title,
  id,
}: TextAreaProps) {
  return (
    <label htmlFor={id} className="w-full flex flex-col gap-2">
      <p
        className={`font-bold text-slate-500 transition-all duration-400 ${
          focus === id ? "-translate-y-1" : null
        }`}
      >
        {title}
      </p>
      <div className="relative h-[100px] border-2 border-slate-200 shadow-md rounded-md">
        <textarea
          id={id}
          value={value}
          maxLength={100}
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
          className="w-full resize-none h-full! focus:outline-none p-2 bg-transparent text-lg!"
        />
      </div>
    </label>
  );
}
