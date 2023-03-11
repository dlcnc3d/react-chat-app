import React from "react";

type Props = {
  username: string;
  setUsername: (username: string) => void;
  handleConnection: () => void;
};

const EnterUsername = (props: Props) => {
  return (
    <form
      className="enter-username-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleConnection();
      }}
    >
      <input
        type="text"
        value={props.username}
        onChange={(e) => props.setUsername(e.target.value)}
        placeholder="Enter username..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnterUsername;
