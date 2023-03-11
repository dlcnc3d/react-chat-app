import React from "react";
import Moment from "react-moment";
import { UserMessage } from "../../types/types";
import Message from "./Message";

type Props = {
  userMessages: UserMessage[];
  handleSendMessage: () => void;
  setMessage: (message: string) => void;
  username: string;
  message: string;
};

const Messages = (props: Props) => {
  // const messageReceived = props.userMessage.username !== props.username;

  return (
    <div className="messages">
      <ul className="message-list scrollable">
        {props.userMessages.map((message, i) => (
          <Message
            key={i + message.username}
            username={props.username}
            userMessage={message}
          ></Message>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSendMessage();
        }}
      >
        <input
          type="text"
          placeholder="type yure message..."
          value={props.message}
          onChange={(e) => {
            props.setMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
