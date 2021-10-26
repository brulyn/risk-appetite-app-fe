import React, { useContext, useEffect, useState } from "react";
import { ViewContext } from "../../contexts/viewContext";
import DashboardView from "./dashboardView";
import InputView from "./inputView";
import OutputView from "./outputView";
import ReportsView from "./ReportsView";
import { RatioContext } from "../../contexts/ratioContext";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { UserContext } from "../../contexts/userContext";

export default function MainScreen() {
  const { view, setView } = useContext(ViewContext);
  const { user, setUser } = useContext(UserContext);
  const [ratios, setRatios] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(view);
  }, [view]);

  useEffect(() => {
    fetch(`http://localhost:3001/allFigures/${user.companyName}/Q12021`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        console.log(Object.keys(response).length);
        if (response && Object.keys(response).length === 0) {
        } else {
          setLoaded(true);
          setRatios(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
