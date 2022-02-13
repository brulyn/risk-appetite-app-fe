import React from "react";

export default function mButton({ label, onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 mr-4 hover:scale-105 active:scale-95 active:shadow-sm"
    >
      <div className=" text-blue-400">{label}</div>
    </button>
  );
}
