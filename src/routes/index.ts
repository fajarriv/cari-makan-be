import { Router } from "express";
import { makananController } from "../controllers";

export const makananRouter: Router = Router();

makananRouter.get("/random", makananController.makananRandom);
makananRouter.get("/", makananController.cariMakanan);
