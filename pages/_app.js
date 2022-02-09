// import "element-theme-default";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { UserContext } from "../contexts/userContext";
import { QuaterContext } from "../contexts/quaterContext";
import { ToleranceContext } from "../contexts/toleranceContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [globalQuater, setGlobalQuater] = useState(`Q1 2021`);
  const [toleranceValues, setToleranceValues] = useState([]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QuaterContext.Provider value={{ globalQuater, setGlobalQuater }}>
        <ToleranceContext.Provider
          value={{ toleranceValues, setToleranceValues }}
        >
          <Component {...pageProps} />
        </ToleranceContext.Provider>
      </QuaterContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
