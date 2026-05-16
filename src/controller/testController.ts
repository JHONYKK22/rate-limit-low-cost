import express from "express";
import type {Request, Response} from "express";
import { connection } from '../db-connection/connection.ts';
import { createValue } from "../service/service.ts";

const router = express.Router();

interface SearchQueryParams {
  msg?: string;  
}

router.get("/create", async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response) => {

  return await createValue(req, res);
});


router.get("/get-value", async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response) => {

  let msg:string = req.query.msg ?? "";
  const redisConnection = await connection();

  const result = await redisConnection.get(msg);

  console.log("result redis");
  console.log(result);

  res.send({ message: `result -> ${result}` });

});


router.get("/increment", async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response) => {

  let msg:string = req.query.msg ?? "";
  if(!msg) {
    res.send({ message: "msg query param is required" });
    return;
  }

  const redisConnection = await connection();

  const exist = await redisConnection.get(msg);
  
  if(!exist) {
    console.log("Entra");
    
    await redisConnection.set(msg, 0);
  }

  const result = await redisConnection.incr(msg);

  console.log("result redis");
  console.log(msg);
  console.log(result);

  res.send({ message: `result -> ${result}` });

});


export default {
    path: "/test-rate",
    router
}


// crear el rate limit segun las configuraciones del archivo word, redis ya esta instalado