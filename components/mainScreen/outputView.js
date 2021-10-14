import React, { useContext } from "react";
import StructuredTable from "../common/structuredTable";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";

export default function OutputView() {
  const { loaded, setLoaded } = useContext(DataLoadedContext);

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="font-semibold text-gray-500">Output</div>
      <div className="flex flex-col mr-4 mt-5 mb-10">
        {loaded && <StructuredTable />}
      </div>
    </div>
  );
}
