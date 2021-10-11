import React, { useContext } from "react";
import { NewspaperIcon } from "@heroicons/react/solid";
import { ViewContext } from "../../../contexts/viewContext";

export default function Reports() {
  const { view, setView } = useContext(ViewContext);
  return (
    <div
      onClick={() => {
        setView("reports");
      }}
      className="flex flex-row h-10 w-full items-center px-6 hover:cursor-pointer pt-3"
    >
      <NewspaperIcon className="h-5 w-5 text-gray-600" />
      <h4 className="font-semibold ml-3 text-gray-600">Reports</h4>
    </div>
  );
}
