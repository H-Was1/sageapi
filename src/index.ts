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
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import {
  subscribe,
  getAllCities,
  getCity,
  unsubscribe,
  updateAll,
} from "./lib/actions";
import cities from "lib/model/cities";
//declare environment here

// Start express app and server
const app = express();
const server = http.createServer(app);

// 1) GLOBAL MIDDLEWARES

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// Implement CORS

// Serving static files

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Add callback Functions here
const getAll = async (req: Request, res: Response) => {
  const city = await getCity(req.params.name);
  if (!city)
    return res.status(404).json({
      status: `Failed to get City : ${req.params.name}`,
    });
  res.status(200).json({
    status: "success",
    data: city,
  });
};
const getOne = async (req: Request, res: Response) => {
  const city = await getCity(req.params.name);
  if (!city)
    return res.status(404).json({
      status: `Failed to get City : ${req.params.name}`,
    });
  res.status(200).json({
    status: "success",
    data: city,
  });
};
const addEmail = async (req: Request, res: Response) => {
  const { city, email } = await req.body;
  const insert = await subscribe(city, email);
  if (!insert)
    return res.status(500).json({
      status: "Error adding email",
    });
  res.json({
    status: "Success",
    message: "Email added successfully",
  });
};
const removeEmail = async (req: Request, res: Response) => {
  const insert = await unsubscribe(req.params.email);
  if (!insert)
    return res.status(500).json({
      status: "Error deleting email",
    });

  res.json({
    status: "Success",
    message: "Email deleted successfully",
  });
};
//Add routes here

app.post("/api/v1/email", addEmail);
app.delete("/api/v1/email/:email", removeEmail);
app.get("/api/v1/cities", getAll);
app.get("/api/v1/cities/:name", getOne);

//add listener here

server.listen(8080, () => "server listening on http://localhost:8080");
