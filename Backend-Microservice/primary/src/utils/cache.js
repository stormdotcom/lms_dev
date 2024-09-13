const redis = require('redis');
const util = require('util');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const client = redis.createClient({ url: redisUrl });

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

client.on('reconnecting', () => {
  console.log('Redis client reconnecting...');
});


(async () => {
  try {
    console.log("Connecting to Redis...");
    await client.connect();
    console.log("Connected to Redis.");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();


module.exports = {
  getCachedData: async function (key) {
    try {
      const data = await client.get(key); 
      return JSON.parse(data);
    } catch (err) {
      console.error(`Error getting data for key ${key}:`, err);
      return null;
    }
  },
  setCachedData: async function (key, data, expiration = 60) {
    try {
      await client.set(key, JSON.stringify(data), 'EX', expiration); // Use the promisified `set` method
      console.log(`Data set for key ${key} with expiration of ${expiration} seconds.`);
    } catch (err) {
      console.error(`Error setting data for key ${key}:`, err);
    }
  }
};
