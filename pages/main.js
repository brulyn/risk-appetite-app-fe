import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import DetailsScreen from "../components/detailsSection";
import MainScreen from "../components/mainScreen";
import SideBar from "../components/sidebar";
import { ViewContext } from "../contexts/viewContext";
import { UserContext } from "../contexts/userContext";
import { useRouter } from "next/dist/client/router";

import "semantic-ui-css/semantic.min.css";
import Navbar from "../components/nav/navbar";

export default function Home() {
  const [view, setView] = useState("dashboard");
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user.username) router.push("/");
  }, [user]);
  return (
    <div className="flex flex-col h-screen">
      {user.username && (
        <ViewContext.Provider value={{ view, setView }}>
          <Navbar />
          <div className="flex flex-row h-full bg-gray-50">
            <SideBar />
            <MainScreen />
            {/* <DetailsScreen /> */}
          </div>
        </ViewContext.Provider>
      )}
    </div>
  );
}
