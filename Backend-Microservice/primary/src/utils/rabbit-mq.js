const amqp = require("amqplib");
const { EXCHANGE_NAME } = require("../config/constants");
const { RABBIT_MQ_URL } = require("../config");

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
  if (connection && channel) {
    return { connection, channel };
  }

  try {
    connection = await amqp.connect(RABBIT_MQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    console.log("[Primary] RabbitMQ running ");
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ: \n", error);
    throw error;
  }
};

const getRabbitMQChannel = async () => {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
};

const getRabbitMQConnection = async () => {
  if (!connection) {
    await getRabbitMQConnection();
  }
  return connection;
};

module.exports = {
  connectRabbitMQ,
  getRabbitMQChannel,
  getRabbitMQConnection
};
