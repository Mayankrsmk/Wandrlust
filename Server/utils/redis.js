const redis = require('redis');

const client = redis.createClient({
    password: 'hzaHTib5epclNqf3Oxe73lRwmhiwBQIu',
    socket: {
        host: 'redis-18835.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18835
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