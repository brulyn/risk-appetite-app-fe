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
      </div>
    </div>
  );
}
