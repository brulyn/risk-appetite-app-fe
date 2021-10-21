import React, { useState, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { Spinner, CornerDialog } from "evergreen-ui";
import { UserContext } from "../contexts/userContext";
import _ from "lodash";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");

  let router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:3001/login/${email}/${password}`, {
      method: "GET",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setUser({
          email: email,
          username: email.split("@")[0],
          password: password,
          companyName: _.upperCase(email.split("@")[1].split(".")[0]),
        });

        router.push("main");
      })
      .catch((err) => {
        setDialogIsShown(true);
        setMessageTitle("Connection Error");
        setErrorMessage(
          "Could not connect to the server. Please make sure the server is up!"
        );
        setLoading(false);
      });
    // setLoading(false);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <CornerDialog
        title={messageTitle}
        hasFooter={false}
        isShown={dialogIsShown}
        onCloseComplete={() => setDialogIsShown(false)}
      >
        {errorMessage}
      </CornerDialog>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center w-1/5 mb-36 bg-gray-50 py-32 shadow-md"
      >
        {/* Title or Logo */}
        <div className="text-lg font-bold uppercase text-gray-700">
          Login - CVL Risk APP
        </div>
        {/* Form with email and passord */}
        <input
          className="border-none py-3 w-3/4 px-3 rounded-md focus:border-none focus:ring-2 mt-6 text-md text-gray-600 shadow-md"
          placeholder="email@company.example"
          // type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className="border-none py-3 w-3/4 px-3 rounded-md focus:border-none focus:ring-2 mt-6 text-md text-gray-600 shadow-md"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {loading && (
          <Spinner
            className="container mx-auto w-3/4 justify-center items-center mt-6 py-3"
            size={32}
          />
        )}

        {!loading && (
          <button className="mt-6 w-3/4 bg-blue-400 py-3 rounded-md text-white shadow-md hover:bg-blue-300 active:bg-blue-500">
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
