import { Router } from "express";
import {
  createShipping,
  getShippings,
  getShippingById,
  updateShipping,
  deleteShipping,
} from "../controllers/shipping.controller";

const router = Router();

router.post("/", createShipping);
router.get("/", getShippings);
router.get("/:id", getShippingById);
router.put("/:id", updateShipping);
router.delete("/:id", deleteShipping);

export default router;
