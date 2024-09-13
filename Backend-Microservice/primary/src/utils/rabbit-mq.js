const amqp = require("amqplib");
const { EXCHANGE_NAME } = require("../config/constants");
const { RABBIT_MQ_URL } = require("../config");
const { v4: uuidv4 } = require('uuid');
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

const publishMessageConsume = async (message, routingKey) => {
  const correlationId = uuidv4();
  const channel = await getRabbitMQChannel();
  const { queue } = await channel.assertQueue('', { exclusive: true });

  return new Promise((resolve, reject) => {
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        try {
          const data = JSON.parse(msg.content.toString());
          if (data.error) {
            reject(new Error(data.message));
          } else {
            resolve(data);
          }
        } catch (error) {
          reject(new Error('Failed to process message'));
        } finally {
          channel.ack(msg);
        }
      }
    }, { noAck: false });

    channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
        replyTo: queue
      }
    );
  });
};

const publishMessage = async ({ type, data, routingKey }) => {
  try {
    const channel = await getRabbitMQChannel();
    const message = { type, data };
    channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
  } catch (err) {
    console.error('Failed to send message to RabbitMQ:', err);
  }
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
  getRabbitMQConnection,
  publishMessage,
  publishMessageConsume
};
