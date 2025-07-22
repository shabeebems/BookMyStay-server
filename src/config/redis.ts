// src/config/redis.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1', // default Redis host
  port: 6379,        // default Redis port
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('🔌 Connected to Redis');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default redis;
