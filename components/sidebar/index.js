import React from "react";
import {
  ChartBarIcon,
  DocumentAddIcon,
  DocumentTextIcon,
  NewspaperIcon,
} from "@heroicons/react/solid";
import Dashboard from "./menuSections/dashboard";
import Transactions from "./menuSections/transactions";
import Reports from "./menuSections/reports";

export default function SideBar() {
  return (
    <div className="min-h-full w-1/12 bg-gray-50 flex flex-col items-center py-5">
      <h1 className="font-bold pb-10">RISK APPETITE</h1>

      <Dashboard />

      <Transactions />

      <Reports />
    </div>
  );
}
