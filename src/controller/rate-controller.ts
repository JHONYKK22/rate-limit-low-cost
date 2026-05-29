import express from "express";
import type {Request, Response} from "express";

const router = express.Router();

// TODO
//create the decorator for the rate limit
//@ratelimit()
router.get("/", (req:Request, res:Response) => {
    res.json({
        ip: req.ip,
        ips: req.ips,
        forwarded: req.headers["x-forwarded-for"]
    })
})

// TODO
//create the decorator for the rate limit
//@ratelimit()
router.get("/info", (req:Request, res:Response) => {
    res.json({
        info: "info",
        ip: req.ip,
        ips: req.ips,
        forwarded: req.headers["x-forwarded-for"]
    })
})


export default {
    path: "/rate",
    router
}