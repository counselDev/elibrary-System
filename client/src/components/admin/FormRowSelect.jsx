import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label className="form-lable" htmlFor={name}>
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="all">all</option>
        {list.map((item) => (
          <option key={item._id} value={item._id} className="text-gray-900">
            {item.abbrevation || item._id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
