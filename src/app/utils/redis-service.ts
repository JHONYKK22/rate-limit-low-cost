import { environmentValues } from "../../environment.ts";

import { connection } from "../../lib/db-connection/connection.ts";
import { RedisService } from "../../lib/service/service.ts";



const redisClient = await connection(
    environmentValues.REDIS_USERNAME, 
    environmentValues.REDIS_PASSWORD, 
    environmentValues.REDIS_HOST, 
    environmentValues.REDIS_PORT
);



export const redisService = new RedisService(redisClient);
/*
export const redisService = new RedisService(redisClient, 
    environmentValues.LIMIT_CALLS, 
    environmentValues.EXPIRATION_TIME_IN_SECONDS
);
*/