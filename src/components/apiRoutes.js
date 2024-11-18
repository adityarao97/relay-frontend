const API_BASE_URL = "http://localhost:8080/api";
// Kafka Configuration APIs
export const saveKafkaConfiguration = async (
  kafkaPort,
  name,
  zookeeperPort
) => {
  const response = await fetch(`${API_BASE_URL}/kafkaConfiguration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kafkaPort,
      name,
      zookeeperPort,
    }),
  });
  return response.json();
};

export const startKafkaConfiguration = async (kafkaConfigurationName) => {
  const response = await fetch(
    `${API_BASE_URL}/kafkaConfiguration/startKafkaServer?kafkaConfigurationName=${kafkaConfigurationName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const getKafkaConfigurationByName = async (kafkaConfigurationName) => {
  const response = await fetch(
    `${API_BASE_URL}/kafkaConfiguration?kafkaConfigurationName=${kafkaConfigurationName}`
  );
  return response.json();
};

export const checkKafkaStatus = async () => {
  const response = await fetch(
    `${API_BASE_URL}/kafkaConfiguration/checkKafkaStatus`
  );
  return response.json;
};

// Topic APIs
export const createTopics = async (topics) => {
  const response = await fetch(`${API_BASE_URL}/topic`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topics),
  });
  return response.json();
};

export const getTopicsByConfigName = async (kafkaConfigurationName) => {
  const response = await fetch(
    `${API_BASE_URL}/topic?kafkaConfigurationName=${kafkaConfigurationName}`
  );
  return response.json();
};

// Consumer APIs
export const createConsumers = async (consumers) => {
  const response = await fetch(`${API_BASE_URL}/consumer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(consumers),
  });
  return response.json();
};

export const getConsumersByTopicName = async (topicName) => {
  const response = await fetch(
    `${API_BASE_URL}/consumer?topicName=${topicName}`
  );
  return response.json();
};

// Push message API
export const pushMessageToTopic = async (message, topicName) => {
  const response = await fetch(
    `${API_BASE_URL}/kafkaConfiguration/pushMessageToTopic?topicName=${topicName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );
  return response.json();
};
