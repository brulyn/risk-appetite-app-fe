import React, { useContext } from "react";
import StructuredTable from "../common/structuredTable";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { ExclamationIcon } from "@heroicons/react/outline";

export default function OutputView() {
  const { loaded, setLoaded } = useContext(DataLoadedContext);

  return (
    <div>
      {loaded && (
        <div className="flex flex-col">
          {/* Title */}
          <div className="font-semibold text-gray-500">
            Risk Appetite Monitoring
          </div>
          <div className="flex flex-col mr-4 mt-5 mb-10">
            <StructuredTable />
          </div>
        </div>
      )}

      {!loaded && (
        <div className="flex flex-col h-screen justify-center items-center">
          <ExclamationIcon className="text-gray-600 h-32 w-32" />
          <div className="text-gray-500 text-lg">
            Hmmm.... It's empty in here. Please load the relevant data.
          </div>
        </div>
      )}
    </div>
  );
}
