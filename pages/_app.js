import "tailwindcss/tailwind.css";
import { useState } from "react";
import { UserContext } from "../contexts/userContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
