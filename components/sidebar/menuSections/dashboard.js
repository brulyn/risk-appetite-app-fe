import React, { useContext } from "react";
import { ChartBarIcon } from "@heroicons/react/solid";
import { ViewContext } from "../../../contexts/viewContext";

export default function Dashboard() {
  const {view, setView} = useContext(ViewContext);
  return (
    <div  onClick = { ()=>{ setView('dashboard') }}  className="flex flex-row h-10 w-full items-center px-5 hover:cursor-pointer pb-3">
      <ChartBarIcon className="h-5 w-5 text-gray-600" />
      <h4 className="font-semibold ml-3 text-gray-600">Dashboard</h4>
    </div>
  );
}
