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
import express, { request } from "express";
import cookieParser from "cookie-parser";
import {
  addEmail,
  getAllCities,
  getCity,
  unsub,
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

//Add routes here

app.post("/api/v1/email", async (req, res) => {
  const { city, email } = await req.body;
  const insert = await addEmail(city, email);
  res.json(insert);
});
app.delete("/api/v1/email/:email", async (req, res) => {
  const email = req.params.email;
  const insert = await unsub(email);
  res.json(insert);
});
app.get("/api/v1/cities", async (req, res) => {
  const cities = await getAllCities();
  res.status(200).json({
    status: "success",
    result: cities.length,
    data: cities,
  });
});
app.get("/api/v1/cities/:name", async (req, res) => {
  const city = await getCity(req.params.name);

  res.status(200).json({
    status: "success",
    data: city,
  });
});

//add listener here

server.listen(8080, () => "server listening on http://localhost:8080");
