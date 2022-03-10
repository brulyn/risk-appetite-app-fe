import React, { useState } from "react";

export default function ToleranceMetric({
  name,
  setValue,
  value,
  error,
  setError,
}) {
  return (
    <div className="flex flex-col w-2/3 mt-2">
      <label className="font-normal text-gray-500 text-sm mb-1 ml-1">
        {name}
      </label>
      <input
        className={
          error
            ? "focus:outline-none border-2 border-red-200 focus:border-red-400 py-2.5 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
            : "focus:outline-none border-2 border-gray-200 focus:border-blue-cvl-400 py-2.5 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
        }
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
