import express from "express";
import type {Request, Response} from "express";

import { rateLimitService } from "../utils/ratelimit-service.ts";



const router = express.Router();



interface SearchQueryParams {
  value: string;  
}
interface CreateValueDTO {
  value: string;  
}


router.get("/value-info", async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response) => {

  let value:string = req.query.value ?? "";

  const data = await rateLimitService.getValueInfo(value);

  res.send({ data });

});





router.get("/create", async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response) => {

  let value:string = req.query.value ?? "";
  return await create(value, res);

});

router.post("/create", async (req: Request<{}, {}, CreateValueDTO, {}>, res: Response) => {

  let value:string = req.body.value ?? "";
  return await create(value, res);

});

async function create(value:string, res:Response): Promise<Response> {

  if (!value || value === "") return res.send({ msg: "INVALID_VALUE" });

  const wasUpdated = await rateLimitService.updateValue(value);

  return res.send({ allowed: wasUpdated });

}



export default {
    path: "/test-rate",
    router
}