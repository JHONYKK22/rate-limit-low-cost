import express from "express";
import type {Request, Response} from "express";

import { environmentValues } from "./environment.ts";

import rateController from "./app/controller/rate-controller.ts";
import testController from "./app/controller/test-controller.ts";


const app = express();
const port = environmentValues.PORT;


// If you trust in all proxies.
//app.set("trust proxy", true);

// if you don't trust in any proxy.
app.set("trust proxy", false);

// if you trust in only one proxy. Prod
//app.set("trust proxy", 1);

app.use(express.json());


app.use(rateController.path, rateController.router)
app.use(testController.path, testController.router)




app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello to this low cost rate limiter :) " });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});