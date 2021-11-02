// import "element-theme-default";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { UserContext } from "../contexts/userContext";
import { QuaterContext } from "../contexts/quaterContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [globalQuater, setGlobalQuater] = useState(`Q1 2011`);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QuaterContext.Provider value={{ globalQuater, setGlobalQuater }}>
        <Component {...pageProps} />
      </QuaterContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
