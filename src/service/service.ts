import { connection } from "../db-connection/connection.ts";

export const getValueInfo = async(value: string): Promise<any> => {
    
  const redisConnection = await connection();

  const [redisKey, ttl, type] = await Promise.all([
    redisConnection.get(value),
    redisConnection.ttl(value),
    redisConnection.type(value),
  ]);

  if (!redisKey) return "NO_VALUE";

  const result = {
    key: {
      name: redisKey,
      value
    },
    ttl,
    type,
  }
    
  return result;

}

const LIMIT_CALLS = 30;
const EXPIRATION_TIME_IN_SECONDS = 60;

export const updateValue = async(value: string):Promise<boolean> => {
    
    const redisConnection = await connection();
    const [currentCallsString, ttl] = await Promise.all([
      redisConnection.get(value),
      redisConnection.ttl(value),
    ]);

    console.log(currentCallsString);
    console.log(ttl);

    const currentCalls:number = parseToNumber(currentCallsString)

    if (currentCalls >= LIMIT_CALLS) {
      redisConnection.expire(value, EXPIRATION_TIME_IN_SECONDS);
      return false;
    }

    // TODO: await
    const result = await redisConnection
    .multi()
    .incr(value)
    .expire(value, EXPIRATION_TIME_IN_SECONDS)
    .exec()
    ;

    console.log(result)

    return true;
    
}

function parseToNumber(value:string | null):number {

  if (value === null) return 0;

  const num = Number(value);

  return Number.isNaN(num) ? 0 : num;

}