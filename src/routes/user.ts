import express from "express";
import jwt from "express-jwt";
import { HASH_SECRET } from "../util/secrets";

import { userController } from "../controllers/userController";

const router = express.Router();
const auth = jwt({
    secret: HASH_SECRET,
    userProperty: "payload"
});

router.get("/profile", auth, userController.readProfile);
router.get("/", userController.getAllUsers);

export default router;