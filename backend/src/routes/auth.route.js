import express from "express"
import { loginUser, registerUser, verifyotp } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema, verifyOtpSchema } from "../validators/auth.validator.js"
import { loginLimiter, registerLimiter, otpLimiter } from "../middleware/raterLimite.js";
const router = express.Router();


router.post("/register", registerLimiter,validate(registerSchema), registerUser);
router.post("/login",loginLimiter ,validate(loginSchema), loginUser);
router.post("/verify-otp",otpLimiter ,validate(verifyOtpSchema) ,verifyotp);

export default router