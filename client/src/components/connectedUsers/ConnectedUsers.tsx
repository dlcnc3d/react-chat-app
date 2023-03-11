import React from "react";
import { User } from "../../types/types";
import UserComponent from "./UserComponent";

type Props = {
  connectedUsers: User[];
};

const ConnectedUsers = (props: Props) => {
  return (
    <div className="connected-users">
      <h2>ConnectedUsers</h2>
      <ul>
        {props.connectedUsers.map((user) => (
          <UserComponent key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUsers;
