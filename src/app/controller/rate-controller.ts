import express from "express";
import type {Request, Response} from "express";
import { ratelimit } from "../../lib/middleware/ratelimit-mid.ts";

const router = express.Router();

router.get("/", ratelimit(), (req:Request, res:Response) => {

    console.log("Do something");
    
    res.json({response: "OK"})
})

router.get("/info", ratelimit({prefix:"info"}), (req:Request, res:Response) => {

    console.log("Do something");
    
    res.json({response: "OK"})
})


export default {
    path: "/rate",
    router
}