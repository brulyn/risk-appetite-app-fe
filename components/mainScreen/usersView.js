import React, { useEffect, useState } from "react";
import UsersTable from "../common/usersTable";
import { Button } from "semantic-ui-react";

export default function UsersView() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users/", {
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
    fetch("http://localhost:3001/users/", {
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
    fetch("http://localhost:3001/users/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        status,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => doRefresh());
  }

  return (
    <div className="flex flex-col pr-5">
      {/* Title */}
      <div className="font-semibold text-gray-500 mb-10">Users</div>

      <UsersTable
        data={users}
        handelOpen={() => {}}
        handelShowMessages={() => {}}
        handelChangeStatus={changeStatus}
      />
    </div>
  );
}
