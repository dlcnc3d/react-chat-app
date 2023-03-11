import React from "react";
import Moment from "react-moment";
import { UserMessage } from "../../types/types";

type Props = {
  userMessage: UserMessage;
  username: string;
};

const Message = (props: Props) => {
  const messageReceived = props.userMessage.username !== props.username;
  return (
    <li className={messageReceived ? "message received" : "message sent"}>
      <div className="message-info">
        <span>
          {props.userMessage.username}{" "}
          <Moment format="MM/DD/YYYY">{Date.now()}</Moment>
        </span>
        <p>{props.userMessage.message}</p>
      </div>
    </li>
  );
};
export default Message;
