import type { Request, Response, NextFunction } from "express";
import { updateValue } from "../service/service.ts";

type RateLimitOptions = {
  path?: string;
  prefix?: string;
};

export function ratelimit(options?: RateLimitOptions) { 
    
    return async function (req:Request, res:Response, next:NextFunction) {

    console.log(`prefix ${options?.prefix}`);
        
    if (!req.ip) {
        return res.status(403).send({
            msg: "Forbidden"
        })
    }

    const data = {
        ...(options?.path && {path: options.path}),
        ...(options?.prefix && {prefix: options.prefix}),
        ip: req.ip + (options?.prefix ? `-${options.prefix}` : ''),
        ips: req.ips,
        forwarded: req.headers["x-forwarded-for"]
    }

    console.log({data});

    const allowed:boolean = await updateValue(data.ip);

    if(!allowed) {
        return res.status(429).send({
            msg: "Too many request!"
        })
    }

    console.log("Continue");
    next();

    };
}
