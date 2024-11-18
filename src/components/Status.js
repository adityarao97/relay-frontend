import React, { useState, useEffect } from "react";
import {
  checkKafkaStatus,
  getTopicsByConfigName,
  getConsumersByTopicName,
} from "../components/apiRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Status = () => {
  const [kafkaStatus, setKafkaStatus] = useState("");
  const [configName, setConfigName] = useState("");
  const [topicName, setTopicName] = useState([]);
  const [topics, setTopics] = useState([]);
  const [consumers, setConsumers] = useState([]);

  const notify = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchKafkaStatus();
  }, []);

  const fetchKafkaStatus = async () => {
    const status = await checkKafkaStatus();
    console.log("status is : " + status)
    setKafkaStatus("✅ Kafka is running");
  };

  const handleFetchTopic = async () => {
    try {
      const topics = await getTopicsByConfigName(configName);

      if (topics) {
        const successMessage = `${JSON.stringify(topics)}`;
        setTopics(topics);
        notify("Topics fetched successfuly");
      } else {
        notify("Failed to fetch topics", "error");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      notify("An error occurred while trying to fetch kafka topics", "error");
    }
  };

  const handleFetchConsumers = async () => {
    try {
      const consumers = await getConsumersByTopicName(topicName);

      if (consumers) {
        const successMessage = `${JSON.stringify(consumers)}`;
        setConsumers(consumers);
        notify("Consumers fetched successfuly");
      } else {
        notify("Failed to fetch consumers", "error");
      }
    } catch (error) {
      console.error("Error fetching consumers:", error);
      notify(
        "An error occurred while trying to fetch kafka consumers",
        "error"
      );
    }
  };

  return (
    <div>
      {/* kafka status */}
      <h1 className="text-2xl font-bold mb-4">Kafka Status: </h1><h1 className="text-2xl font-bold mb-4 text-green-500">{kafkaStatus}</h1>
      <div className="mb-4">
        <p></p>
      </div>
      {/* kafka topics */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2"
          placeholder="Config Name"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
        />
        <button
          onClick={handleFetchTopic}
          className="bg-black text-white p-2 ml-2 border-2 border-white"
        >
          Fetch Topics
        </button>
        <h2 className="font-semibold">Topics: </h2>
        <ul>
          {topics.map((topic, index) => (
            <li key={index}>{topic.name}</li>
          ))}
        </ul>
      </div>
      {/* kafka consumers */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2"
          placeholder="Topic Name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <button
          onClick={handleFetchConsumers}
          className="bg-black text-white p-2 ml-2 border-2 border-white"
        >
          Fetch Consumers
        </button>
        <h2 className="font-semibold">Consumers: </h2>
        <ul>
          {consumers.map((consumer, index) => (
            <li key={index}>{consumer.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
