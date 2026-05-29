import type { RedisClientType } from "redis";


export class RedisService {

  readonly redisClient: RedisClientType;
  readonly LIMIT_CALLS:number;
  readonly EXPIRATION_TIME_IN_SECONDS:number;

  constructor(client: RedisClientType, limitCalls?:number, expirationTimeInSeconds?:number) {

    this.redisClient = client;
    this.LIMIT_CALLS=limitCalls ?? 30;
    this.EXPIRATION_TIME_IN_SECONDS = expirationTimeInSeconds ?? 60;

  }

  async getValueInfo (value: string): Promise<any> {
    
    const [redisKey, ttl, type] = await Promise.all([
      this.redisClient.get(value),
      this.redisClient.ttl(value),
      this.redisClient.type(value),
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


  async updateValue(value: string):Promise<boolean> {
      
    const [currentCallsString, ttl] = await Promise.all([
      this.redisClient.get(value),
      this.redisClient.ttl(value),
    ]);

    console.log(currentCallsString);
    console.log(ttl);

    const currentCalls:number = this.parseToNumber(currentCallsString)

    if (currentCalls >= this.LIMIT_CALLS) {
      this.redisClient.expire(value, this.EXPIRATION_TIME_IN_SECONDS);
      return false;
    }

    // TODO: await
    const result = await this.redisClient
    .multi()
    .incr(value)
    .expire(value, this.EXPIRATION_TIME_IN_SECONDS)
    .exec()
    ;

    console.log(result)

    return true;
      
  }

  private parseToNumber(value:string | null):number {

    if (value === null) return 0;

    const num = Number(value);

    return Number.isNaN(num) ? 0 : num;

  }

}
