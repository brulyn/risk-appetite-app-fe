import React, { useContext } from "react";
import StructuredTable from "../common/structuredTable";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Tab } from "semantic-ui-react";

export default function OutputView() {
  const { loaded, setLoaded } = useContext(DataLoadedContext);

  const panes = [
    {
      menuItem: "Quantitative Metrics",
      render: () => (
        <div className="mr-5 mb-5">
          <Tab.Pane attached={false}>
            <div>
              {loaded && (
                <div className="flex flex-col">
                  {/* Title */}

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
          </Tab.Pane>
        </div>
      ),
    },
    {
      menuItem: "Qualitative Metrics",
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: "Tab 3",
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
  ];
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}
