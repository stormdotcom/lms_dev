const amqp = require("amqplib");
const { RABBIT_MQ_SERVER } = require("../config");

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
  if (connection && channel) {
    return { connection, channel };
  }

  try {
    connection = await amqp.connect(RABBIT_MQ_SERVER);
    console.log("[RabbitMQ] Analytics Server ")
    channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};

const getRabbitMQChannel = async () => {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
};

module.exports = {
  connectRabbitMQ,
  getRabbitMQChannel,
};
