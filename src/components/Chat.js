// import React, { useState, useEffect } from 'react';

// const Chat = ({ currentUserId, targetUserId }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');

//   // Fetch chat history
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const response = await fetch(`http://localhost:8080/api/chat/history/${currentUserId}/${targetUserId}`);
//       const data = await response.json();
//       setMessages(data);
//     };

//     fetchMessages();
//   }, [currentUserId, targetUserId]);

//   // Send message to the backend
//   const handleSendMessage = async () => {
//     const response = await fetch('http://localhost:8080/api/chat/send', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         sender: { id: currentUserId },
//         receiver: { id: targetUserId },
//         message: message,
//       }),
//     });

//     if (response.ok) {
//       const newMessage = await response.json();
//       setMessages([...messages, newMessage]);
//       setMessage(''); // Clear input field
//     } else {
//       console.error('Failed to send message');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ maxHeight: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ marginBottom: '10px' }}>
//             <strong>{msg.sender.fullName}:</strong> {msg.message}
//             <small style={{ display: 'block', fontSize: '12px', color: 'gray' }}>
//               {new Date(msg.timestamp).toLocaleTimeString()}
//             </small>
//           </div>
//         ))}
//       </div>

//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         rows="3"
//         style={{ width: '100%' }}
//       />
//       <button onClick={handleSendMessage} style={{ marginTop: '10px' }}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default Chat;
