import React, { useEffect, useState } from "react";
import UsersTable from "../common/usersTable";
import { Button, Dropdown } from "semantic-ui-react";
import mButton from "../common/mButton";
import QualitativeInput from "../common/qualitativeInput";
import ToleranceInput from "../common/toleranceInput";
import ToleranceMetric from "../common/toleranceMetric";

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [portView, setPortView] = useState("list");
  const companyOptions = [
    {
      key: "CVL",
      value: "CVL",
      text: "CVL",
    },
    {
      key: "INYANGE",
      value: "INYANGE",
      text: "INYANGE",
    },
    {
      key: "ISCO",
      value: "ISCO",
      text: "ISCO",
    },
    {
      key: "NPD",
      value: "NPD",
      text: "NPD",
    },
    {
      key: "REAL",
      value: "REAL",
      text: "REAL",
    },
    {
      key: "EAGI",
      value: "EAGI",
      text: "EAGI",
    },
    {
      key: "STONECRAFT",
      value: "STONECRAFT",
      text: "STONECRAFT",
    },
    {
      key: "MUKAMIRA",
      value: "MUKAMIRA",
      text: "MUKAMIRA",
    },
    {
      key: "RULIBA",
      value: "RULIBA",
      text: "RULIBA",
    },
    {
      key: "CONSTRUCK",
      value: "CONSTRUCK",
      text: "CONSTRUCK",
    },
    {
      key: "INTARE",
      value: "INTARE",
      text: "INTARE",
    },
    {
      key: "SAWMIL",
      value: "SAWMIL",
      text: "SAWMIL",
    },
  ];

  const profileOptions = [
    {
      key: "MD",
      value: "MD",
      text: "Managing Director",
    },
    {
      key: "FD",
      value: "FD",
      text: "Finance Director",
    },

    {
      key: "RC",
      value: "RC",
      text: "Risk Champion",
    },
  ];

  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState(generatePassword());
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setUsers(response));
  }, []);

  function doRefresh() {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setUsers(response));
  }

  function changeStatus(user, status) {
    fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          status,
        }),
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => doRefresh());
  }

  function generatePassword() {
    var length = 10,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  async function createUser() {
    setPassword(generatePassword());
    let body = {
      names,
      email,
      profile,
      password,
      status: "active",
      company,
    };

    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/email/send`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "riskinfo@cvl.co.rw",
              to: email,
              subject: "Account created",
              messageType: "accountCreated",
              password,
            }),
          }
        )
          .then(() => {
            doRefresh();
            setPortView("list");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col pr-5">
      {/* Title */}
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="font-semibold text-gray-500">
          {portView === "list" ? "List of Users" : "New User"}
        </div>
        {portView === "list" && (
          <button
            onClick={() => setPortView("new")}
            className="flex items-center justify-center bg-blue-cvl-800 rounded shadow-md cursor-pointer px-4 py-2 hover:scale-105 active:scale-95 active:shadow-sm"
          >
            <div className="text-white text-xs">Add New</div>
          </button>
        )}

        {portView === "new" && (
          <button
            onClick={() => setPortView("list")}
            className="flex items-center justify-center bg-yellow-600 rounded shadow-md cursor-pointer px-4 py-2 hover:scale-105 active:scale-95 active:shadow-sm"
          >
            <div className="text-white text-xs">Cancel</div>
          </button>
        )}
      </div>

      {portView === "list" && (
        <UsersTable
          data={users}
          handelOpen={() => {}}
          handelShowMessages={() => {}}
          handelChangeStatus={changeStatus}
        />
      )}

      {portView === "new" && (
        <div className="mt-1 mb-10">
          <div className="flex flex-col w-1/5 mt-2 mr-5">
            <ToleranceMetric name="Names" setValue={setNames} value={names} />

            <ToleranceMetric name="Email" setValue={setEmail} value={email} />

            <div className="flex flex-col w-1/5 mt-2 mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Company
              </label>
              <Dropdown
                placeholder="Company"
                search
                selection
                value={company}
                options={companyOptions}
                onChange={(e, { value }) => {
                  setCompany(value);
                }}
              />
            </div>

            <div className="flex flex-col w-1/5 mt-2 mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Profile
              </label>
              <Dropdown
                placeholder="Profile"
                search
                selection
                value={profile}
                options={profileOptions}
                onChange={(e, { value }) => {
                  setProfile(value);
                }}
              />
            </div>

            <button
              onClick={() => createUser()}
              className="flex items-center justify-center bg-blue-cvl-800 rounded shadow-md cursor-pointer w-1/5 mt-5 px-4 py-2 hover:scale-105 active:scale-95 active:shadow-sm"
            >
              <div className="text-white text-xs">Submit</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
