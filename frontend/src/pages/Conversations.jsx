import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../features/auth/authSlice";
import { BsSearch } from 'react-icons/bs'
import image2 from '../image/chat2.png'


const Conversations = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const [participants, setParticipants] = useState(users);

  useEffect(() => {
    const data = { token: user.token };
    dispatch(fetchUsers(data));
  }, [dispatch]);

  function createConversationName(username) {
    const namesAlph = [user?.username, username].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl my-5 font-medium">Conversations List</h1>
      <div className="flex justify-between">
        <div>
        <div className="relative w-96">
        <input type="text" className="w-96 border rounded-lg h-14 focus:outline-none focus:border-blue-400 pl-4 text-lg font-Inter" placeholder="Search Participants..." />
      <BsSearch className="absolute top-5 right-4 text-xl text-gray-400" />
      </div>
      {participants?.map((parti, index) => (
        <div key={index} className="border w-96 rounded-lg my-2 py-3 hover:shadow-md">
          <Link to={`/chats/${createConversationName(parti.username)}`}>
            <div className="flex justify-start ml-5">
              <img
                src={parti.avatar}
                alt={parti.avatar}
                className="w-16 h-16 rounded-full"
              />
              <h5 className="ml-3 text-xl capitalize">{parti.username}</h5>
            </div>
          </Link>
        </div>
      ))}
        </div>
        <div>
          <img src={image2} className="w-64 h-64" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Conversations;
