const redis = require('redis');
// set up redis and create a client
// if this is a docker container then docker has a different idea of what localhost is
const redisClient = redis.createClient({ host: 'redis' });

module.exports = {
    redisClient: redisClient
}