const redis = require('redis');

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect().then(() => {
    console.log('Redis connected')
  });
})();

module.exports = redisClient;