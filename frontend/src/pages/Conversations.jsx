import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../features/auth/authSlice";

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
      {participants.map((parti, index) => (
        <div key={index} className="border w-96 rounded-lg">
          <Link to={`/chats/${createConversationName(parti.username)}`}>
            <div className="flex justify-start mt-5 ml-5">
              <img
                src={parti.avatar}
                alt={parti.avatar}
                className="w-12 h-12 rounded-full"
              />
              <h5 className="ml-3 text-xl capitalize">{parti.username}</h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
