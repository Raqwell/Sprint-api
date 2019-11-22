import express from "express";
import jwt from "express-jwt";
import { HASH_SECRET } from "../util/secrets";

import { sprintController } from "../controllers/sprintController";

const router = express.Router();
const auth = jwt({
    secret: HASH_SECRET,
    userProperty: "payload"
});

//router.get("/", sprintController.getAllSprints);
router.get("/", sprintController.getAllSprintsByUser);
router.post("/", sprintController.createSprint);
router.delete("/", sprintController.deleteAllSprintsByUser);

router.get("/filteredSprints", sprintController.getFilteredSprints);

router.get("/sprint/:sprintId", sprintController.getSprintById);
router.put("/sprint/:sprintId", sprintController.updateSprint);
router.delete("/sprint/:sprintId", sprintController.deleteSprint);

export default router;