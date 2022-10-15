import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
const Chat = () => {
  const { conversationName } = useParams();
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  console.log(chatHistory);

  const { readyState, sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/${conversationName}/` : null,
    {
      queryParams: {
        token: user ? user.token : "",
      },
      onOpen: () => {
        console.log("Connected");
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
            setChatHistory((chat) => chat.concat(data.message));
            break;
          case "last_50_messages":
            setChatHistory(data.messages);
            break;
          default:
            console.error("unknown type of data");
            break;
        }
      },
    }
  );

  const onSendMessage = (e) => {
    e.preventDefault();
    sendJsonMessage({
      type: "chat_message",
      message,
    });
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="my-4">
        <form onSubmit={onSendMessage}>
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
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <div
              className={
                user.email === message.from_user.email
                  ? "flex justify-start"
                  : "flex justify-end"
              }
            >
              <div>
                {message.from_user.username} : {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
