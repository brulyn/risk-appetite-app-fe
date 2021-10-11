import React, { useContext } from "react";
import { ViewContext } from "../../contexts/viewContext";
import DashboardView from "./dashboardView";
import InputView from "./inputView";
import OutputView from "./outputView";
import ReportsView from "./ReportsView";

export default function MainScreen() {
  const { view, setView } = useContext(ViewContext);

  return (
    <div className="min-h-full flex-1 bg-white pt-5 pl-5">
      {view === "dashboard" && <DashboardView />}
      {view === "input" && <InputView />}
      {view === "output" && <OutputView />}
      {view === "reports" && <ReportsView />}
    </div>
  );
}
