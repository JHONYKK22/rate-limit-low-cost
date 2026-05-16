import type {Request, Response} from "express";
import { connection } from "../db-connection/connection.ts";

interface SearchQueryParams {
  msg?: string;
}

export const createValue = async(req: Request<{}, {}, {}, SearchQueryParams>, res: Response) => {
    
    let msg:string = req.query.msg ?? "";
    
    const redisConnection = await connection();
    
    const result = await redisConnection.set(msg, 0);
    
    console.log("result redis create");
    console.log(result);
    console.log(msg);
    
    res.send({ message: `saved ${msg}` });
    
}