import express from "express";
import type {Request, Response} from "express";

import { ratelimit } from "../../lib/middleware/ratelimit-mid.ts";

import { redisService } from "../utils/redis-service.ts";



const router = express.Router();



router.get("/", ratelimit({ service:redisService }), (req:Request, res:Response) => {

    console.log("Do something");
    
    res.json({response: "OK"})
})

router.get("/info", ratelimit({prefix:"info", service: redisService}), (req:Request, res:Response) => {

    console.log("Do something");
    
    res.json({response: "OK"})
})


export default {
    path: "/rate",
    router
}