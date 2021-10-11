import React, {useState} from "react";
import Head from "next/head";
import DetailsScreen from "../components/detailsSection";
import MainScreen from "../components/mainScreen";
import SideBar from "../components/sidebar";
import { ViewContext } from "../contexts/viewContext";

export default function Home() {
  const [view, setView] = useState('dashboard') 
  return (
    <div className="flex min-h-screen">
      <ViewContext.Provider value={{view, setView}}>
        <SideBar />
        <MainScreen />
        <DetailsScreen />
      </ViewContext.Provider>
    </div>
  );
}
