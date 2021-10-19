import React, { useContext } from "react";
import { PresentationChartBarIcon } from "@heroicons/react/solid";
import { ViewContext } from "../../../contexts/viewContext";

export default function Dashboard() {
  const { view, setView } = useContext(ViewContext);
  return (
    <div
      onClick={() => {
        setView("dashboard");
      }}
      className="flex flex-row h-10 w-full items-center justify-start hover:cursor-pointer mb-10"
    >
      <div className="pl-4 w-1/3">
        <PresentationChartBarIcon className="h-8 w-8 text-gray-600" />
      </div>
      <div className="font-semibold text-gray-600">Dashboard</div>
    </div>
  );
}
