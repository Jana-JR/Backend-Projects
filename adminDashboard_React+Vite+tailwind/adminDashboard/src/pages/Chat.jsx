import { useState, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const messages = [
    {
      id: 1,
      sender: "John",
      message: "Hey, My product didnt arrive",
      time: "2 hours ago",
      image: "/inbox1.jpg",
    },
    {
      id: 2,
      sender: "Smith",
      message: "Received parcel is seal broken",
      time: "1 day ago",
      image: "/inbox2.webp",
    },
    {
      id: 3,
      sender: "Bob",
      message: "Shit Happens",
      time: "2 days ago",
      image: "/inbox3.jpg",
    },
    {
      id: 4,
      sender: "Tyler",
      message: "My account is not working",
      time: "3 days ago",
      image: "/inbox4.webp",
    },
  ];

  useEffect(() => {
    setChat(messages);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const newMsg = {
        id: chat.length + 1,
        sender: "You",
        message: input,
        time: "Just now",
        image: "/avatar.png",
      };
      setChat([newMsg, ...chat]);
      setInput("");
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100 w-full flex flex-col">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Chat</h1>

        <div className="space-y-4 sm:space-y-6 shadow-xl/10">
          {chat.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:space-x-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <img
                  src={msg.image}
                  alt={msg.sender}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 mt-3 sm:mt-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{msg.sender}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{msg.message}</p>
              </div>
              <span className="text-sm text-gray-500 mt-2 sm:mt-0 sm:ml-auto whitespace-nowrap">{msg.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-2 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-black hover:bg-opacity-50 text-white px-4 py-2 rounded-md whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
