import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { fnCallOpenAI } from "./llm";
import cors from "cors";
import { getFilteredResponse } from "./responseHandler";

dotenv.config();

const app = express();
app.use(cors());
// Parse request bodies automatically, so request body parameters are available with res.body
// use body-parser middleware with limit option
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/fn", async (req, res) => {
  if (!req.body["message"]) {
    // throw 400 error
    res.status(400).send("No chat message provided");
  }
  try {
    const response = await fnCallOpenAI(req.body["message"]);
    res.json(getFilteredResponse(response));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
