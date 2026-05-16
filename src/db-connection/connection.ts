import client from "../redis/redis-client.ts";


export const connection = async() => {

    return client;

}