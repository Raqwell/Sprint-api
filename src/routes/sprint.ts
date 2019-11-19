import express from "express";
import jwt from "express-jwt";
import { HASH_SECRET } from "../util/secrets";

import { sprintController } from "../controllers/sprintController";

const router = express.Router();
const auth = jwt({
    secret: HASH_SECRET,
    userProperty: "payload"
});

router.get("/", sprintController.getAllSprints);
router.get("/:sprintId", sprintController.getSprint);
router.post("/", sprintController.createSprint);
router.put("/:sprintId", sprintController.updateSprint);
router.delete("/", sprintController.deleteAllSprints);
router.delete("/:sprintId", sprintController.deleteSprint);

export default router;