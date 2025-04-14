import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

const ChatWindow = ({ currentUser, chatUser, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/chat/history', {
          params: {
            sender: currentUser,
            receiver: chatUser,
          },
        });
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [chatUser, currentUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    const messageObj = {
      senderUsername: currentUser,
      receiverUsername: chatUser,
      content: msg,
    };

    try {
      await axios.post('http://localhost:8080/api/chat/send', messageObj);
      setMsg('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMsg((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[380px] sm:w-[420px] bg-white shadow-2xl rounded-xl border border-gray-200 flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white px-4 py-3 rounded-t-xl">
        <h3 className="font-semibold text-lg">Chat with {chatUser}</h3>
        <button onClick={onClose} className="text-white text-lg font-bold">×</button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50 space-y-2">
        {messages.map((m, i) => {
          const isSent = m.senderUsername === currentUser;
          return (
            <div
              key={i}
              className={`max-w-[70%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                isSent
                  ? 'bg-blue-100 self-end ml-auto text-right'
                  : 'bg-gray-200 self-start mr-auto text-left'
              }`}
            >
              <p>{m.content}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                {new Date(m.timestamp).toLocaleTimeString()}
              </p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="border-t px-2">
          <EmojiPicker onEmojiClick={onEmojiClick} height={300} />
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-2 border-t p-2 bg-white">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-xl px-2"
        >
          😊
        </button>
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-1"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
