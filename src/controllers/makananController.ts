import { RequestHandler } from "express";
import { BaseResponseBodySuccessful } from "../types";
import { MAKANAN_INDONESIA } from "../utils";

const makananRandom: RequestHandler<
  null,
  BaseResponseBodySuccessful<string>,
  null,
  null
> = (req, res) => {
  const len = MAKANAN_INDONESIA.length;
  const randomIndex = Math.floor(Math.random() * len);
  const randomMakanan = MAKANAN_INDONESIA[randomIndex];
  res
    .send({
      success: true,
      result: randomMakanan,
      error: null,
    })
    .status(200);
};

export const makananController = { makananRandom };
