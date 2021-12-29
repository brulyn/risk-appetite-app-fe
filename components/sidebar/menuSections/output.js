import React, { useContext } from "react";
import { DesktopComputerIcon } from "@heroicons/react/solid";
import { ViewContext } from "../../../contexts/viewContext";

export default function Output() {
  const { view, setView } = useContext(ViewContext);
  return (
    <div
      onClick={() => {
        setView("output");
      }}
      className={
        view === "output"
          ? "flex flex-row h-10 w-full items-center justify-start hover:cursor-pointer px-2 py-7 space-x-2 bg-gray-50  border-l-4 border-blue-cvl-600 ml-2"
          : "flex flex-row h-10 w-full items-center justify-start hover:cursor-pointer px-2 py-7 space-x-2 hover:scale-105 transition ease-in-out duration-200"
      }
    >
      <div className="pl-4">
        <DesktopComputerIcon
          className={
            view === "output"
              ? "h-6 w-6 text-blue-cvl-900"
              : "h-6 w-6 text-gray-100"
          }
        />
      </div>
      <div
        className={
          view === "output"
            ? "hidden md:block font-semibold text-blue-cvl-900"
            : "hidden md:block font-semibold text-gray-100"
        }
      >
        Monitoring
      </div>
    </div>
  );
}
