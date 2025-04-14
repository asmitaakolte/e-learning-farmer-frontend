// import React, { useState, useEffect } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// const Chat = ({ userId }) => {
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [client, setClient] = useState(null);

//   // Establish WebSocket connection
//   useEffect(() => {
//     const stompClient = new Client({
//       brokerURL: 'http://localhost:8080/chat', // WebSocket endpoint
//       connectHeaders: {
//         userId: userId,
//       },
//       onConnect: () => {
//         stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             message.body,
//           ]);
//         });
//       },
//       onDisconnect: () => {
//         console.log('Disconnected from WebSocket');
//       },
//     });

//     setClient(stompClient);
//     stompClient.activate();

//     // Fetch users growing the same crops
//     fetch(`/api/users/${userId}/same-crop-users`)
//       .then((res) => res.json())
//       .then(setUsers);

//     return () => {
//       if (client) {
//         client.deactivate();
//       }
//     };
//   }, [userId]);

//   // Send message to another user
//   const sendMessage = (receiverId) => {
//     if (client && message) {
//       client.publish({
//         destination: `/app/chat`,
//         body: JSON.stringify({ message, receiverId }),
//       });
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h3>Chat</h3>
//       <div>
//         <h4>Users Growing the Same Crop</h4>
//         {users.map((user) => (
//           <div key={user.id}>
//             <p>{user.username}</p>
//             <button onClick={() => sendMessage(user.id)}>Send Message</button>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h4>Messages</h4>
//         <div>
//           {messages.map((msg, index) => (
//             <p key={index}>{msg}</p>
//           ))}
//         </div>
//       </div>
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={() => sendMessage()}>Send</button>
//     </div>
//   );
// };

// export default Chat;
