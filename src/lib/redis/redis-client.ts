import { createClient } from 'redis';
import { environmentValues } from '../../environment.ts';

const client = createClient({
    username: environmentValues.REDIS_USERNAME,
    password: environmentValues.REDIS_PASSWORD,
    socket: {
        host: environmentValues.REDIS_HOST,
        port: environmentValues.REDIS_PORT
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export default client;