import express from "express";
import { getUsers, insertUser, showUser, updateUser, deleteUser } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", insertUser);
router.get("/:id", showUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

