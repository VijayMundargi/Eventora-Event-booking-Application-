import express from "express"

const router = express.Router();

router.get("/health",(req,res)=>{
    res.status(200).json({
        success:false,
        message:"OK"
    });
})

export default router;