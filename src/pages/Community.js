import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';

const Community = () => {
  const [users, setUsers] = useState([]);
  const [chatWith, setChatWith] = useState(null);
  const currentUser = localStorage.getItem("username"); // ✅ get correct logged-in user

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:8080/api/users?exclude=${currentUser}`)
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }
  }, [currentUser]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Connect with Farmers</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center border-b pb-2">
            <span>{user.username}</span>
            <button onClick={() => setChatWith(user)} className="bg-blue-500 text-white px-3 py-1 rounded">
              Chat
            </button>
          </li>
        ))}
      </ul>

      {chatWith && (
        <ChatWindow
          currentUser={currentUser}
          chatUser={chatWith.username}
          onClose={() => setChatWith(null)}
        />
      )}
    </div>
  );
};

export default Community;
