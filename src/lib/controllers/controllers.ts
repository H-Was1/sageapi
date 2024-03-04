import cities from "lib/model/cities";
import {
  subscribe,
  getAllCities,
  getCity,
  unsubscribe,
  updateAll,
  // createCity,
} from "../actions";
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

export const renew = async (req: Request, res: Response) => {
  const update = await updateAll();
  if (!update)
    return res.status(400).json({
      status: "Bad request",
    });
  res.status(200).json({
    status: "Success",
    message: "Data updated successfully",
  });
};
