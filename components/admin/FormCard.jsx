/* eslint-disable react/jsx-key */
import React from "react";

const FormCard = ({ label, type, name, placeholder, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-slate-300 tracking-wide">
        {label}
      </label>
      <input
        multiple
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-300 focus:border-green-500 text-sm rounded-sm block w-full p-2.5 outline-none"
      ></input>
    </div>
  );
};

export default FormCard;
