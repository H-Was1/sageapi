import {
  subscribe,
  getAllCities,
  getCity,
  unsubscribe,
  updateAll,
  sendAll,
  // createCity,
} from "../actions";

const moment = require("moment-timezone");
import express, { Request, Response } from "express";
export const getAll = async (req: Request, res: Response) => {
  const cities = await getAllCities();
  if (cities.length <= 1)
    return res.status(404).json({
      status: `Failed to get City : ${req.params.name}`,
    });
  res.status(200).json({
    status: "success",
    result: cities.length,
    data: cities,
  });
};
export const getOne = async (req: Request, res: Response) => {
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
export const addEmail = async (req: Request, res: Response) => {
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
export const removeEmail = async (req: Request, res: Response) => {
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
// export const addOne = async (req: Request, res: Response) => {
//   const insert = await createCity(req.params);
//   res.json({
//     Data: insert,
//   });
// };

export const renew = async () => {
  const now = moment().tz("Asia/Karachi"); // Set timezone to Pakistan Standard Time
  if (now.hour() === 6 && now.minute() === 30) {
    console.log("Updating data at 6:30 AM PKT");
    // Place your data update logic here

    await updateAll();

    //place email sending logic here

    await sendAll();
  }
};
