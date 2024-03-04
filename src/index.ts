//declare environment here
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
    }
  }
}
require("dotenv").config();
import cors from "cors";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";

import {
  addEmail,
  // addOne,
  getAll,
  getOne,
  removeEmail,
  renew,
} from "./lib/controllers/controllers";
import { sendAll, updateAll } from "./lib/actions";

// Start express app and server
const app = express();
const server = http.createServer(app);

// 1) GLOBAL MIDDLEWARES
app.disable("x-powered-by"); // less hackers know about our stack
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// Implement CORS

// Serving static files

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Add routes here
// updateAll();
app.post("/api/v1/email", addEmail);
app.delete("/api/v1/email/:email", removeEmail);
app.get("/api/v1/cities/update", renew);
app.get("/api/v1/cities/:name", getOne);
app.get("/api/v1/cities", getAll);
// .post(addOne)

//add listener here

server.listen(8080, () => "server listening on http://localhost:8080");
