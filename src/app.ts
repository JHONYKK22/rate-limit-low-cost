import express from "express";
import type {Request, Response} from "express";
import rateController from "./controller/rate-controller.ts";
import testController from "./controller/test-controller.ts";
import { environmentValues } from "./environment.ts";

const app = express();
const port = environmentValues.PORT;

app.set("trust proxy", true);
app.use(express.json());



app.use(rateController.path, rateController.router)



app.use(testController.path, testController.router)





app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World" });
});

app.get("/port", (req: Request, res: Response) => {
  res.send({ message: `Hello World from port ${port}` });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
