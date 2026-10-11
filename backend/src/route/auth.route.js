import express from "express"
import { loginUser, registerUser, verifyotp } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema, verifyOtpSchema } from "../validators/auth.validator.js"
const router = express.Router();


router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/verify-otp", validate(verifyOtpSchema) ,verifyotp);

export default router