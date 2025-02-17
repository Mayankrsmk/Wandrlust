const { createClient } = require('redis');

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-14892.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 14892
    }
});

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis
(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

module.exports = client;