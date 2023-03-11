import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import ConnectedUsers from "./components/connectedUsers/ConnectedUsers";
import EnterUsername from "./components/EnterUsername";
import Messages from "./components/messages/Messages";
import { User, UserMessage } from "./types/types";

function App() {
  //const socketClient = useRef<SocketIOClient.Socket>();
  const socketClient = useRef<any>();

  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socketClient.current = io("http://localhost:5000");

    if (socketClient.current) {
      socketClient.current.on("username-taken", () => {
        toast.error("Username is taken");
      });

      socketClient.current.on("username-submitted-successfuly", () => {
        setConnected(true);
      });

      socketClient.current.on(
        "get-connected-users",
        (connectedUsers: User[]) => {
          console.log("connectedUsers", connectedUsers);

          setConnectedUsers(
            connectedUsers.filter((user) => user.username !== username)
          );
        }
      );

      socketClient.current.on("receive-message", (userMessage: UserMessage) => {
        setMessages((prev) => [...prev, userMessage]);
      });

      return () => {
        if (socketClient.current) {
          socketClient.current.disconnect();
          socketClient.current = undefined;
        }
      };
    }
  }, [username]);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit("handle-connection", username);
    }
  };

  const handleSendMessage = () => {
    if (socketClient.current) {
      setMessages((prev) => [...prev, { message, username }]);
      socketClient.current.emit("message", { message, username });
      setMessage("");
    }
  };

  return (
    <div className="app">
      {!connected && (
        <EnterUsername
          handleConnection={handleConnection}
          username={username}
          setUsername={setUsername}
        ></EnterUsername>
      )}
      {connected && (
        <>
          <ConnectedUsers connectedUsers={connectedUsers} />

          <Messages
            handleSendMessage={handleSendMessage}
            message={message}
            setMessage={setMessage}
            username={username}
            userMessages={messages}
          ></Messages>
        </>
      )}
      <ToastContainer position="bottom-right"></ToastContainer>
    </div>
  );
}

export default App;
