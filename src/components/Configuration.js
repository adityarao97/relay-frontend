import React, { useState } from "react";
import {
  saveKafkaConfiguration,
  createTopics,
  createConsumers,
  startKafkaConfiguration,
} from "../components/apiRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Configuration = () => {
  const [configName, setConfigName] = useState("");
  const [configName2, setConfigName2] = useState("");
  const [kafkaPort, setKafkaPort] = useState("");
  const [zookeeperPort, setZookeeperPort] = useState("");
  const [externalPort, setExternalPort] = useState("");
  const [topicName, setTopicName] = useState("");
  const [kafkaConfigId, setKafkaConfigId] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [kafkaConfigIdConsumer, setKafkaConfigIdConsumer] = useState("");
  const [topicId, setTopicId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [requestType, setRequestType] = useState("");
  const [downstreamAPI, setDownstreamAPI] = useState("");

  const notify = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSaveKafkaConfig = async () => {
    try {
      const kafkaConfig = await saveKafkaConfiguration(
        kafkaPort,
        configName,
        zookeeperPort
      );

      if (kafkaConfig) {
        const successMessage = `Kafka Configuration saved successfully! Config: ${JSON.stringify(
          kafkaConfig
        )}`;
        notify(successMessage);
      } else {
        notify("Failed to save Kafka Configuration", "error");
      }
      setKafkaPort("");
      setConfigName("");
      setZookeeperPort("");
    } catch (error) {
      console.error("Error saving Kafka config:", error);
      notify("An error occurred while saving Kafka Configuration", "error");
    }
  };

  const handleCreateTopic = async () => {
    try {
      const topics = [{ kafkaConfigId: kafkaConfigId, name: topicName }];
      const createdTopics = await createTopics(topics);
      if (createdTopics) {
        const successMessage = `Topic(s) saved successfully! Topic(s) are : ${JSON.stringify(
          createdTopics
        )}`;
        notify(successMessage);
      } else {
        notify("Failed to save Topics", "error");
      }
      setKafkaConfigId("");
      setTopicName("");
    } catch (error) {
      console.error("Error saving Topic(s):", error);
      notify("An error occurred while saving topic(s)", "error");
    }
  };

  const handleCreateConsumer = async () => {
    try {
      const consumers = [
        {
          name: consumerName,
          topicId: topicId,
          groupId: groupId,
          kafkaConfigId: kafkaConfigIdConsumer,
          requestType: requestType,
          downstreamAPI: downstreamAPI,
        },
      ];
      const createdConsumers = await createConsumers(consumers);
      if (createdConsumers && createdConsumers.length > 0) {
        const consumer = createdConsumers[0];
        const successMessage = `Kafka Configuration saved successfully! Config: 
        Name: ${consumer.name}, 
        Topic ID: ${consumer.topicId}, 
        Group ID: ${consumer.groupId}, 
        Kafka Config ID: ${consumer.kafkaConfigId}, 
        Request Type: ${consumer.requestType}, 
        Downstream API: ${consumer.downstreamAPI}`;
        notify(successMessage);
      } else {
        notify("Failed to save Consumers", "error");
      }
      setConsumerName("");
      setTopicId("");
      setGroupId("");
      setKafkaConfigIdConsumer("");
      setRequestType("");
      setDownstreamAPI("");
    } catch (error) {
      console.error("Error saving Consumer:", error);
      notify("An error occurred while saving Consumer", "error");
    }
  };

  const handleStartKafka = async () => {
    try {
      const response = await startKafkaConfiguration(configName2);
      if (response && response.isActive) {
        const successMessage = `Kafka server started successfully`;
        notify(successMessage);
      } else {
        notify(
          "Failed to start Kafka, check if Docker daemon is running",
          "error"
        );
      }
      setConfigName2("");
    } catch (error) {
      console.error("Error starting Kafka:", error);
      notify("An error occurred while starting kafka", "error");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kafka Configuration</h1>

      {/* Kafka Config Form */}
      <div className="mb-4">
        <h2 className="font-semibold">Create Kafka Config</h2>
        <input
          type="text"
          className="border p-2"
          placeholder="Kafka Config Name"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2"
          placeholder="Kafka Port"
          value={kafkaPort}
          onChange={(e) => setKafkaPort(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 ml-2"
          placeholder="Zookeeper Port"
          value={zookeeperPort}
          onChange={(e) => setZookeeperPort(e.target.value)}
        />
        <button
          onClick={handleSaveKafkaConfig}
          className="bg-black text-white p-2 ml-2 border-2 border-white"
        >
          Save Kafka Config
        </button>
      </div>

      {/* Topic Form */}
      <div className="mb-4">
        <h2 className="font-semibold">Create Topic</h2>
        <input
          type="text"
          className="border p-2"
          placeholder="Kafka Config ID"
          value={kafkaConfigId}
          onChange={(e) => setKafkaConfigId(e.target.value)}
        />
        <input
          type="text"
          className="border p-2"
          placeholder="Topic Name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <button
          onClick={handleCreateTopic}
          className="bg-black text-white p-2 ml-2 border-2 border-white"
        >
          Create Topic
        </button>
      </div>

      {/* Consumer Form */}
      <div className="mb-4">
        <h2 className="font-semibold">Create Consumer</h2>
        <input
          type="text"
          className="border p-2"
          placeholder="Consumer Name"
          value={consumerName}
          onChange={(e) => setConsumerName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 ml-2"
          placeholder="Kafka Config Id"
          value={kafkaConfigIdConsumer}
          onChange={(e) => setKafkaConfigIdConsumer(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 ml-2"
          placeholder="Topic Id"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 ml-2"
          placeholder="Group Id"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
        <select
          className="border p-2 ml-2"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="" disabled>
            Select Request Type
          </option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          type="text"
          className="border p-2 ml-2"
          placeholder="Downstream API"
          value={downstreamAPI}
          onChange={(e) => setDownstreamAPI(e.target.value)}
        />
        <button
          onClick={handleCreateConsumer}
          className="bg-black text-white p-2 ml-2 border-2 border-white"
        >
          Create Consumer
        </button>
      </div>

      {/* Start Kafka */}
      <div className="mb-4">
        <h2 className="font-semibold">Start Kafka</h2>
        <input
          type="text"
          className="border p-2"
          placeholder="Kafka Config Name"
          value={configName2}
          onChange={(e) => setConfigName2(e.target.value)}
        />
        <button
          onClick={handleStartKafka}
          className="bg-black text-white p-2 ml-2 border-2 border-white"
        >
          Start Kafka
        </button>
      </div>
    </div>
  );
};
