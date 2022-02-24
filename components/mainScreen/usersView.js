import React, { useEffect, useState } from "react";
import UsersTable from "../common/usersTable";
import { Spinner, CornerDialog } from "evergreen-ui";
import { Button, Dropdown } from "semantic-ui-react";
import mButton from "../common/mButton";
import QualitativeInput from "../common/qualitativeInput";
import ToleranceInput from "../common/toleranceInput";
import ToleranceMetric from "../common/toleranceMetric";
import { toast } from "react-toastify";

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [portView, setPortView] = useState("list");

  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("RC");
  const [password, setPassword] = useState(generatePassword());
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("CVL");
  const [profiles, setProfiles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [creating, setCreating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setUsers(response))
      .catch((err) => {
        toast.error("Can't fetch users!");
      });

    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/profiles/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setProfiles(response))
      .catch((err) => {
        toast.error("Can't fetch Profiles!");
      });

    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/companies/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setCompanies(response))
      .catch((err) => {
        toast.error("Can't fetch companies!");
      });

    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/metrics/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setMetrics(response))
      .catch((err) => {
        toast.error("Can't fetch metrics!");
      });
  }, []);

  useEffect(() => {
    if (names.length > 0 && email.length > 0) setCanSubmit(true);
    else setCanSubmit(false);
  }, [names, email]);

  function doRefresh() {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setUsers(response))
      .catch((err) => {
        toast.error("Can't fetch users!");
      });
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
      .then((resp) => doRefresh())
      .catch((err) => toast.error("Couldn't connect to server!"));
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
    if (names.length > 0 && email.length > 0) {
      setPassword(generatePassword());
      let body = {
        names,
        email,
        profile,
        password,
        status: "active",
        company,
        watches,
      };
      setCreating(true);

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
              setCreating(false);
              doRefresh();
              setPortView("list");
            })
            .catch((err) => {
              setCreating(false);
            });
        })
        .catch((err) => {
          setCreating(false);
        });
    }
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
                options={companies.map((c) => {
                  return {
                    key: c.name,
                    value: c.name,
                    text: c.name,
                  };
                })}
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
                options={profiles.map((p) => {
                  return {
                    key: p.name,
                    value: p.name,
                    text: p.description,
                  };
                })}
                onChange={(e, { value }) => {
                  setProfile(value);
                }}
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Metrics to watch
              </label>
              <Dropdown
                placeholder="Watches"
                multiple
                selection
                options={metrics.map((m) => {
                  return {
                    key: m.name,
                    value: m.name,
                    text: m.description,
                  };
                })}
                onChange={(v, d) => {
                  setWatches(d.value);
                }}
              />
            </div>

            {!creating && canSubmit && (
              <button
                onClick={() => createUser()}
                className="flex items-center justify-center bg-blue-cvl-800 rounded shadow-md cursor-pointer w-1/5 mt-5 px-4 py-2 hover:scale-105 active:scale-95 active:shadow-sm"
              >
                <div className="text-white text-xs">Submit</div>
              </button>
            )}

            {creating && (
              <Spinner
                className="mt-5 justify-center items-center py-3"
                size={32}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
