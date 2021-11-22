import React from "react";
import {
  ChartBarIcon,
  DocumentAddIcon,
  DocumentTextIcon,
  NewspaperIcon,
} from "@heroicons/react/solid";
import Dashboard from "./menuSections/dashboard";
import Input from "./menuSections/input";
import Output from "./menuSections/output";
import Reports from "./menuSections/reports";
import Settings from "./menuSections/settings";

export default function SideBar() {
  return (
    <div className="w-56 bg-white flex flex-col items-center py-5">
      {/* <div className="font-bold pb-10">RISK APPETITE</div> */}

      <Dashboard />
      <Input />
      <Output />
      {/* <Reports /> */}
      <Settings />
    </div>
  );
}
