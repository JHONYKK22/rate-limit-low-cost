import express from "express";
import type {Request, Response} from "express";

import { ratelimit } from "../../lib/middleware/ratelimit-mid.ts";

import { rateLimitService } from "../utils/ratelimit-service.ts";



const router = express.Router();



router.get("/", ratelimit({ service:rateLimitService }), (req:Request, res:Response) => {

    console.log("Do something");
    
    res.json({response: "OK"})
})

router.get("/info", ratelimit({ prefix:"info", service: rateLimitService }), (req:Request, res:Response) => {

    console.log("Do something");
    
    res.json({response: "OK"})
})


export default {
    path: "/rate",
    router
}