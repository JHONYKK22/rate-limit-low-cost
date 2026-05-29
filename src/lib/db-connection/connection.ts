import type { RedisClientType } from "redis";
import { createRedisClient } from "../redis/redis-client.ts";

export const connection = async(username: string, password: string, host: string, port: number): Promise<RedisClientType> => {

    return await createRedisClient(username, password, host, port);

}
