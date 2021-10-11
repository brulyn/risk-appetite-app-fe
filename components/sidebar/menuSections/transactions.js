import React, {useContext} from "react";
import { DocumentAddIcon, DocumentTextIcon } from "@heroicons/react/solid";
import { ViewContext } from "../../../contexts/viewContext";

export default function Transactions() {
  const {view,setView} = useContext(ViewContext);
  return (
    <div>
      <div onClick = { ()=>{ setView('input') }} className="flex flex-row h-10 w-full items-center px-5 hover:cursor-pointer pb-3">
        <DocumentAddIcon className="h-5 w-5 text-gray-600" />
        <h4 className="font-semibold ml-3 text-gray-600">Input Data</h4>
      </div>

      <div onClick = { ()=>{ setView('output') }}  className="flex flex-row h-10 w-full items-center px-5 hover:cursor-pointer pb-3 border-b-2">
        <DocumentTextIcon className="h-5 w-5 text-gray-600" />
        <h4 className="font-semibold ml-3 text-gray-600">Output</h4>
      </div>
    </div>
  );
}
