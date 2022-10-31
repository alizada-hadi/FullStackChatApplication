import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
const Chat = () => {
  const { conversationName } = useParams();
  const name = conversationName.split("__")
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);


  const participant = users.find(user => user.username === name[0])


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
    <div class="container mx-auto">
      <div class="max-w-3xl border rounded mt-10">
        <div>
          <div class="w-full">
            <div class="relative flex items-center p-3 border-b border-gray-300">
              <img class="object-cover w-10 h-10 rounded-full"
                src={participant?.avatar} alt="username" />
              <span class="block ml-2 font-bold text-gray-600">{participant?.username}</span>
              <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
              </span>
            </div>
            <div class="relative w-full p-6 overflow-y-auto h-[25rem] mt-10">

              <ul class="space-y-2">
                {chatHistory.map((chat, index) => (
                <li key={index} className={user.email === chat.from_user.email ? "flex justify-start" : "flex justify-end"}>
                  <div className={user.email === chat.from_user.email ? "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow" : "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow bg-gray-100"}>
                    <span class="block">{chat.content}</span>
                  </div>
                </li>
                ))}
              </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <form onSubmit={onSendMessage} className="flex items-center w-full">
              <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Message"
                class="block w-full py-4 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required />
              
              <button type="submit">
                <svg class="w-8 h-8 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
