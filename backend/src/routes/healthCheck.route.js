import express from "express"
import { healthCheckLimiter } from "../middleware/raterLimite.js";
const router = express.Router();

router.get("/health",healthCheckLimiter,(req,res)=>{
    res.status(200).json({
        success:false,
        message:"OK"
    });
})

export default router;