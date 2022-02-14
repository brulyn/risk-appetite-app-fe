import React, { useContext } from "react";
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
import Users from "./menuSections/users";
import { UserContext } from "../../contexts/userContext";

export default function SideBar() {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav className="w-20 md:w-56 bg-blue-cvl-900 flex flex-col justify-between h-screen sticky top-1 pt-4">
      {/* <div className="font-bold pb-10">RISK APPETITE</div> */}

      <div className="flex flex-col items-center">
        <Dashboard />
        {(user.profile === "RC" ||
          user.profile === "Admin" ||
          user.profile === "Tech" ||
          user.profile === "RD" ||
          user.profile === "SROF") && <Input />}
        <Output />
        {/* <Reports /> */}
        {(user.profile === "Admin" ||
          user.profile === "RD" ||
          user.profile === "SROF") && <Settings />}
      </div>

      {(user.profile === "Admin" ||
        user.profile === "Tech" ||
        user.profile === "RD" ||
        user.profile === "SROF") && (
        <div className="mb-28">
          <Users />
        </div>
      )}
    </nav>
  );
}
