import React from "react";
import { User } from "../../types/types";

type Props = {
  user: User;
};

const UserComponent = (props: Props) => {
  return (
    <li className="connected-user">
      <img src="/assets/user.png" alt="userlogo" />
      <span>{props.user.username}</span>
    </li>
  );
};

export default UserComponent;
