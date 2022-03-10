import React from "react";

export default function MLable({ content }) {
  return (
    <div className="flex items-center justify-center  w-3/4 mb-1 shadow-md rounded-md bg-white text-gray-500 text-sm  font-medium py-1 cursor-pointer">
      {content}
    </div>
  );
}
