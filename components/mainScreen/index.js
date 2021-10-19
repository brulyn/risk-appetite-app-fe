import React, { useContext, useEffect, useState } from "react";
import { ViewContext } from "../../contexts/viewContext";
import DashboardView from "./dashboardView";
import InputView from "./inputView";
import OutputView from "./outputView";
import ReportsView from "./ReportsView";
import { RatioContext } from "../../contexts/ratioContext";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";

export default function MainScreen() {
  const { view, setView } = useContext(ViewContext);
  const [ratios, setRatios] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(view);
  }, [view]);
  return (
    <div className="min-h-full flex-1 bg-gray-50 pt-5 pl-5">
      {view === "dashboard" && <DashboardView />}
      {view === "input" && (
        <RatioContext.Provider value={{ ratios, setRatios }}>
          <DataLoadedContext.Provider value={{ loaded, setLoaded }}>
            <InputView />
          </DataLoadedContext.Provider>
        </RatioContext.Provider>
      )}
      {view === "output" && (
        <RatioContext.Provider value={{ ratios, setRatios }}>
          <DataLoadedContext.Provider value={{ loaded, setLoaded }}>
            <OutputView />
          </DataLoadedContext.Provider>
        </RatioContext.Provider>
      )}
      {view === "reports" && <ReportsView />}
    </div>
  );
}
