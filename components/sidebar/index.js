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
import Image from "next/image";
import { LogoutIcon } from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";

export default function SideBar() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  return (
    <nav className="w-20 md:w-56 bg-blue-cvl-900 flex flex-col justify-between h-screen sticky pt-4">
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

      <div className="mb-20 space-y-5">
        {/* <div className="flex flex-row bg-yellow-400 rounded shadow-lg h-36 mx-2"></div> */}
        {(user.profile === "Admin" ||
          user.profile === "Tech" ||
          user.profile === "RD" ||
          user.profile === "SROF") && (
          <div className="mb-2">
            <Users />
          </div>
        )}

        <div className="flex flex-row justify-between items-center mx-4 mt-2 ">
          <div className="flex flex-row justify-between space-x-2 items-center cursor-pointer ">
            {/* Names */}
            <div class="flex-shrink-0 h-12 w-12 rounded-full shadow-sm p-1 transition ease-in-out duration-200 bg-white">
              <Image
                height="150"
                width="150"
                class="rounded-full object-contain"
                src={`/logos/${user.companyName}.jpg`}
                alt=""
              />
            </div>
            <div className="text-white text-sm hover:underline">
              {user.username}
            </div>
          </div>

          <LogoutIcon
            className="h-7 w-7 text-yellow-400 hover:text-yellow-300 cursor-pointer"
            onClick={() => {
              setUser({});
              window.localStorage.removeItem("user");
              router.push("/");
            }}
          />
        </div>
      </div>
    </nav>
  );
}
