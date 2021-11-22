import React from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import {
  UserIcon,
  InboxIcon,
  ChevronDownIcon,
  BellIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex sticky top-0 flex-row justify-between shadow-md bg-fixed p-2 bg-white text-gray-500">
      <div className="flex flex-row items-center ml-4">
        <Image height="40" width="130" src="/logo.png" />
      </div>

      <div className="hidden md:flex flex-row items-center font-bold text-xl text-gray-600 ">
        Risk Management System
      </div>
      <div className="flex flex-row justify-between space-x-5 mr-5">
        {/* Inbox */}
        <div className="flex items-center h-10 w-10 justify-center cursor-pointer font-thin bg-transparent rounded-full hover:shadow-lg">
          <InboxIcon className="h-7 w-7 hover:scale-105 hover:text-blue-400 transitin ease-in-out duration-200 active:text-blue-500 " />
        </div>

        {/* Notifications */}
        <div className="flex items-center h-10 w-10 justify-center cursor-pointer font-thin bg-transparent rounded-full hover:shadow-lg">
          <BellIcon className=" h-7 w-7 hover:scale-105 hover:text-yellow-400 transitin ease-in-out duration-200 active:text-yellow-500" />
        </div>

        {/* Username & Photo */}
        {/* <div className="flex items-center mr-7 cursor-pointer hover:scale-105 hover:text-blue-400 transitin ease-in-out duration-200 active:text-blue-500">
          
          <div className="text-lg font-semibold mr-2">Bruce</div>
          <ChevronDownIcon className="h-4 w-4" />
        </div> */}

        {/* Username & Photo */}
        <div
          className="flex items-center h-10 w-10 justify-center cursor-pointer font-thin bg-transparent rounded-full hover:shadow-lg hover:text-red-400 transitin ease-in-out duration-200 active:text-red-500"
          onClick={() => {
            router.push("/");
          }}
        >
          {/* <UserIcon className="h-7 w-7" /> */}

          <LogoutIcon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
}
