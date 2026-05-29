import dotenv from "dotenv";

dotenv.config();

type EnvironmentValues = {
    PORT: number,
    REDIS_USERNAME: string,
    REDIS_PASSWORD: string,
    REDIS_HOST: string,
    REDIS_PORT: number,

    LIMIT_CALLS: number,
    EXPIRATION_TIME_IN_SECONDS:number,

};

const parsedPort = Number.parseInt(
    process.env.PORT ?? "3000",
    10
);

const parsedRedisPort = Number.parseInt(
    process.env.REDIS_PORT ?? "6379",
    10
);


export const environmentValues: EnvironmentValues = {
    PORT: Number.isNaN(parsedPort) ? 3000 : parsedPort,
    REDIS_USERNAME: process.env.REDIS_USERNAME ?? "",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? "",
    REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1",
    REDIS_PORT: Number.isNaN(parsedRedisPort) ? 6379 : parsedRedisPort,

    LIMIT_CALLS: Number.parseInt(process.env.RL_LIMIT_CALLS ?? "30", 10),
    EXPIRATION_TIME_IN_SECONDS: Number.parseInt(process.env.RL_EXPIRATION_TIME_IN_SECONDS ?? "60", 10),
};