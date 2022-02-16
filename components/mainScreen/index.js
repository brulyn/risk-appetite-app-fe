import React, { useContext, useEffect, useState } from "react";
import { ViewContext } from "../../contexts/viewContext";
import DashboardView from "./dashboardView";
import InputView from "./inputView";
import OutputView from "./outputView";
import { RatioContext } from "../../contexts/ratioContext";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { QuaterContext } from "../../contexts/quaterContext";
import { UserContext } from "../../contexts/userContext";
import { ToleranceContext } from "../../contexts/toleranceContext";
import SettingsView from "./settingsView";
import UsersView from "./usersView";
const host = `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001`;

export default function MainScreen() {
  const { view, setView } = useContext(ViewContext);
  const { user, setUser } = useContext(UserContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const { toleranceValues, setToleranceValues } = useContext(ToleranceContext);
  const [ratios, setRatios] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (globalQuater.length === 7) {
      fetch(`${host}/riskTolerance/${user.selectedCompany}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setToleranceValues(response[0]);
        });

      fetch(`${host}/allFigures/${user.selectedCompany}/${globalQuater}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response && Object.keys(response).length === 0) {
            setLoaded(false);
            setRatios([]);
          } else {
            setLoaded(true);
            // setLoaded(true);
            setRatios(response);
          }
        })
        .catch((err) => {
          setLoaded(false);
          setRatios([]);
        });
    }
  }, [view, user]);

  useEffect(() => {
    if (globalQuater.length === 7) {
      fetch(`${host}/riskTolerance/${user.selectedCompany}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setToleranceValues(response[0]);
        });

      fetch(`${host}/allFigures/${user.selectedCompany}/${globalQuater}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
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
        });
    }
  }, [globalQuater]);

  return (
    <div className="flex-1 bg-gray-50 pt-5 pl-5 ">
      <RatioContext.Provider value={{ ratios, setRatios }}>
        <DataLoadedContext.Provider value={{ loaded, setLoaded }}>
          {view === "dashboard" && <DashboardView />}
          {view === "input" && <InputView />}
          {view === "output" && <OutputView />}
          {view === "users" && <UsersView />}
          {view === "settings" && <SettingsView />}
        </DataLoadedContext.Provider>
      </RatioContext.Provider>
    </div>
  );
}
