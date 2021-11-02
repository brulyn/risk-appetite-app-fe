import React, { useContext, useEffect, useState } from "react";
import { ViewContext } from "../../contexts/viewContext";
import DashboardView from "./dashboardView";
import InputView from "./inputView";
import OutputView from "./outputView";
import ReportsView from "./ReportsView";
import { RatioContext } from "../../contexts/ratioContext";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { QuaterContext } from "../../contexts/quaterContext";
import { UserContext } from "../../contexts/userContext";
import SettingsView from "./settingsView";

export default function MainScreen() {
  const { view, setView } = useContext(ViewContext);
  const { user, setUser } = useContext(UserContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const [ratios, setRatios] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // console.log(view);
    // console.log(globalQuater);
  }, [view]);

  useEffect(() => {
    console.log(globalQuater);
    if (globalQuater.length === 7) {
      fetch(
        `http://localhost:3001/allFigures/${user.companyName}/${globalQuater}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // console.log(response);
          // console.log(Object.keys(response).length);
          if (response && Object.keys(response).length === 0) {
            setLoaded(false);
            setRatios([]);
          } else {
            setLoaded(true);
            setRatios(response);
          }
        })
        .catch((err) => {
          setLoaded(false);
          setRatios([]);
          console.log(err);
        });
    }
  }, [view, globalQuater]);
  return (
    <div className="min-h-full flex-1 bg-white pt-5 pl-5">
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
      {view === "settings" && <SettingsView />}
    </div>
  );
}
