import { createClient } from 'redis';

export async function createRedisClient(username: string, password: string, host: string, port: number) {

    const client = createClient({
        username:username,
        password: password,
        socket: {
            host: host,
            port: port
        }
    });

  client.on("error", (err) => {
    console.error("Redis error:", err);
  });

  await client.connect();

  return client;
  
}