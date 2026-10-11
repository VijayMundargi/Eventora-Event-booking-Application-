import express from "express"
import { admin, isAuthenticated } from "../middleware/auth.js"
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller.js";
import { validate } from "../middleware/validate.js"
import { createEventSchema } from "../validators/event.validator.js"
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);


router.post("/", isAuthenticated, admin,validate(createEventSchema),createEvent)
router.post("/:id", isAuthenticated, admin, updateEvent)
router.delete("/:id", isAuthenticated, admin, deleteEvent)


export default router