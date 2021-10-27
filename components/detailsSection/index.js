import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { LogOutIcon } from "evergreen-ui";
import { useRouter } from "next/dist/client/router";
import _ from "lodash";
import { Dropdown, Menu, Label, Icon } from "semantic-ui-react";

export default function DetailsScreen() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  let router = useRouter();
  useEffect(() => {
    console.log(user);

    let _username = user.username ? user.username.split("@")[0] : "";
    setUsername(_.capitalize(_username));
    setCompany(user.companyName);
  }, [user]);
  return (
    <div className="flex flex-row min-h-full w-2/12 bg-white justify-start">
      <div className="mt-5">
        {/* Title */}
        <div className="text-gray-500 mx-2">
          {/* {username}, {company} */}
          <Dropdown
            text={username}
            // icon="user"
            labeled
            // button
            className="icon"
            simple
            closeOnChange
          >
            <Dropdown.Menu>
              <Dropdown.Item icon="inbox" text="Inbox" />
              <Dropdown.Item icon="user outline" text="Profile" />
              <Menu.Item as="a">
                <Icon name="bell outline" /> Notifications
                <Label color="teal" floating size="tiny">
                  22
                </Label>
              </Menu.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon="address book outline" text="My Activity" />
              <Dropdown.Divider />
              <Dropdown.Item
                icon="logout"
                text="Logout"
                onClick={() => {
                  router.push("/");
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* <LogOutIcon
        onClick={() => {
          router.push("/");
        }}
        className="text-gray-700 h-6 w-6 mt-6 ml-5 mr-1 hover:cursor-pointer flex-grow"
      /> */}
    </div>
  );
}
