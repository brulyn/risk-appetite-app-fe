import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import {
  UserIcon,
  InboxIcon,
  ChevronDownIcon,
  BellIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { UserContext } from "../../contexts/userContext";

export default function Navbar() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [showUserActions, setShowUserActions] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);
  return (
    <div className="relative">
      <div className="flex sticky top-0 flex-row justify-between shadow-sm bg-fixed p-2 bg-white text-blue-cvl-900">
        <div className="flex flex-row items-center ml-4">
          <Image height="40" width="115" src="/logo.png" />
        </div>

        {/* <div className="hidden md:flex flex-row items-center font-bold text-xl text-gray-600 ">
        Risk Management System
      </div> */}

        <div
          className="flex flex-row justify-between space-x-2 mr-5 items-center cursor-pointer"
          onClick={() => {
            setShowUserActions(!showUserActions);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              // do your thing.
            } else {
              setShowUserActions(false);
            }
          }}
        >
          {/* Names */}
          <div className="text-blue-cvl-900 text-base hover:text-blue-cvl-700 hover:underline">
            {user.email}
          </div>
          <div class="flex-shrink-0 h-12 w-12 rounded-full shadow-sm p-1 hover:scale-105 hover:shadow-md transition ease-in-out duration-200 ">
            <Image
              height="150"
              width="150"
              class="rounded-full object-contain"
              src={`/logos/${user.companyName}.jpg`}
              alt=""
            />
          </div>
        </div>
      </div>
      {showUserActions && (
        <span className="absolute top-16 right-6 rounded-md bg-white w-56 shadow-lg">
          <div className="grid grid-cols-1 justify-between divide-y">
            <div className="cursor-pointer py-4 px-4 hover:bg-blue-cvl-50 hover:text-blue-cvl-700 transition ease-in-out duration-300">
              Notifications
            </div>
            <div className="cursor-pointer py-4 px-4 hover:bg-blue-cvl-50 hover:text-blue-cvl-700 transition ease-in-out duration-300">
              Inbox
            </div>

            <div className="cursor-pointer py-4 px-4 hover:bg-blue-cvl-50 hover:text-blue-cvl-700 transition ease-in-out duration-300">
              Profile
            </div>
            <div
              onClick={() => {
                setUser({});
                window.localStorage.removeItem("user");
                router.push("/");
              }}
              className="cursor-pointer py-4 px-4 hover:bg-blue-cvl-50 hover:text-blue-cvl-700 transition ease-in-out duration-300 "
            >
              Logout
            </div>
          </div>
        </span>
      )}
    </div>
  );
}
