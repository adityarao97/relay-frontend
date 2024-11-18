import React, { useState, useEffect } from 'react';
import { pushMessageToTopic } from '../components/apiRoutes';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Action = () => {
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    setMessageAtStart();
  }, []);

  const setMessageAtStart = () => {
    setMessage('{"key": "value"}')
  }

  const handlePushMessage = async () => {

    try {
      const response = await pushMessageToTopic(message, topic);

      if (response) {
        notify("Message pushed successfully");
      } else {
        notify("Failed to save push message", "error");
      }
    } catch (error) {
      console.error("Error pushing message:", error);
      notify("An error occurred while pushing message", "error");
    }
    setTopic('')
  };

  const notify = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Push Message to Kafka</h1>

      <div className="mb-4">
        <h2>Enter message in JSON</h2>
        <input
          type="text"
          className="border p-2 text-gray-500"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 ml-2"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button onClick={handlePushMessage} className="bg-black text-white p-2 ml-2 border-2 border-white">Push Message</button>
      </div>
    </div>
  );
};
