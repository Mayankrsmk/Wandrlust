const redis = require('redis');

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-18771.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18771
    }
});

(async () => {
    await client.connect();
})();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;