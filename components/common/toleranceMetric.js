import React, { useState } from "react";

export default function ToleranceMetric({ name, setValue, value }) {
  const [localValue, setLocalValue] = useState(value);
  const [valuesSet, setValueSet] = useState({});
  return (
    <div className="flex flex-col w-2/3 mt-2">
      <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
        {name}
      </label>
      <input
        type="number"
        className="focus:outline-none border-2 border-gray-200 focus:border-blue-cvl-400 py-2.5 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
