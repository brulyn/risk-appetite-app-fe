import React, { useContext } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/solid";
import { ViewContext } from "../../../contexts/viewContext";

export default function Reports() {
  const { view, setView } = useContext(ViewContext);
  return (
    <div
      onClick={() => {
        setView("reports");
      }}
      className={
        view === "reports"
          ? "flex flex-row h-10 w-full items-center justify-start hover:cursor-pointer px-2 py-7 space-x-2 bg-gray-50  border-l-4 border-blue-400 ml-2"
          : "flex flex-row h-10 w-full items-center justify-start hover:cursor-pointer px-2 py-7 space-x-2 hover:scale-105 transition ease-in-out duration-200"
      }
    >
      <div className="pl-4">
        <DocumentDuplicateIcon
          className={
            view === "reports"
              ? "h-8 w-8 text-blue-400"
              : "h-8 w-8 text-gray-600"
          }
        />
      </div>
      <div
        className={
          view === "reports"
            ? "hidden md:block font-semibold text-blue-400"
            : "hidden md:block font-semibold text-gray-600"
        }
      >
        Reports
      </div>
    </div>
  );
}
