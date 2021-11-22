import React, { useContext, useEffect, useState } from "react";
import StructuredTable from "../common/structuredTable";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { ExclamationIcon } from "@heroicons/react/outline";
import { QuaterContext } from "../../contexts/quaterContext";
import { Tab, Dropdown } from "semantic-ui-react";
import StructuredTableQual from "../common/structuredTableQual";

export default function OutputView() {
  const { loaded, setLoaded } = useContext(DataLoadedContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);

  const [quater, setQuater] = globalQuater
    ? useState(globalQuater?.substr(0, 2))
    : useState("Q1");
  const [year, setYear] = globalQuater
    ? useState(globalQuater?.substr(globalQuater.length - 4))
    : useState(new Date().getFullYear());

  const [quaterYear, setQuaterYear] = useState(
    `Q1 ${new Date().getFullYear()}`
  );

  const quaterList = [
    {
      qtext: "Quater 1",
      abbr: "Q1",
    },
    {
      qtext: "Quater 2",
      abbr: "Q2",
    },
    {
      qtext: "Quater 3",
      abbr: "Q3",
    },
    {
      qtext: "Quater 4",
      abbr: "Q4",
    },
  ];
  const quaterOptions = _.map(quaterList, (quater, index) => ({
    key: quaterList[index].abbr,
    text: quaterList[index].qtext,
    value: quaterList[index].abbr,
  }));

  const panes = [
    {
      menuItem: "Quantitative Metrics",
      render: () => (
        <div className="mr-5 h-full">
          <div className="flex flex-row w-2/5 mt-2 mr-5">
            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Quater
              </label>
              <Dropdown
                placeholder="Quater"
                search
                selection
                value={quater}
                options={quaterOptions}
                onChange={(e, { value }) => {
                  setQuater(value);
                  // setQuaterYear(value + " " + year);
                  setGlobalQuater(value + " " + year);
                }}
              />
            </div>

            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Year
              </label>
              <input
                className="focus:outline-none border-2 border-gray-200 focus:border-blue-300 py-2 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
                value={year}
                type="number"
                onChange={(e) => {
                  setYear(e.target.value);
                  // setQuaterYear(quater + " " + e.target.value);
                  setGlobalQuater(quater + " " + e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            {loaded && (
              <div className="flex flex-col">
                {/* Title */}

                <div className="flex flex-col mr-4 mt-2 mb-10">
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
        </div>
      ),
    },
    {
      menuItem: "Qualitative Metrics",
      render: () => (
        <div className="mr-5 mb-5">
          <div className="flex flex-row w-2/5 mt-2 mr-5">
            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Quater
              </label>
              <Dropdown
                placeholder="Quater"
                search
                selection
                value={quater}
                options={quaterOptions}
                onChange={(e, { value }) => {
                  setQuater(value);
                  // setQuaterYear(value + " " + year);
                  setGlobalQuater(value + " " + year);
                }}
              />
            </div>

            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Year
              </label>
              <input
                className="focus:outline-none border-2 border-gray-200 focus:border-blue-300 py-2 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
                value={year}
                type="number"
                onChange={(e) => {
                  setYear(e.target.value);
                  // setQuaterYear(quater + " " + e.target.value);
                  setGlobalQuater(quater + " " + e.target.value);
                }}
              />
            </div>
          </div>
          {loaded && (
            <div className="flex flex-col">
              {/* Title */}

              <div className="flex flex-col mr-4 mt-2 mb-10">
                <StructuredTableQual />
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
      ),
    },
  ];

  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}
