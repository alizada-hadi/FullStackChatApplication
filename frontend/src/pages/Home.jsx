import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Home = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { readyState, sendJsonMessage } = useWebSocket("ws://127.0.0.1:8000/", {
    onOpen: () => {
      console.log("connected");
    },
    onClose: () => {
      console.log("Disconnected");
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "welcome_message":
          setWelcomeMessage(data.message);
          break;
        case "chat_message_echo":
          setChatHistory((chat) => chat.concat(data));
          break;
        default:
          console.error("unknown type of data");
          break;
      }
    },
  });
  const onSendMessage = (e) => {
    e.preventDefault();
    sendJsonMessage({
      type: "chat_message",
      name,
      message,
    });
    setName("");
    setMessage("");
  };
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex">
        <div>
          <form onSubmit={onSendMessage}>
            <div className="w-[25rem]">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                First name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div className="w-[25rem]">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 mt-3 text-white text-lg rounded-lg border bg-indigo-900"
            >
              Send
            </button>
          </form>
        </div>
        <div className="ml-24">
          <h1 className="font-bold text-2xl">Chat History</h1>
          <div className="mt-10">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                {chat.name} : {chat.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
