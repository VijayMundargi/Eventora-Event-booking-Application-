import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js";
import { ENV } from "../config/ENV.js";
import userModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";


export const isAuthenticated = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new ApiError("401", "Please Login!")
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ENV.JWT_SECREAT);

    const user = await userModel.findById(decoded.id)

    if(!user){
        throw new ApiError(401,"User not found");
    }

    req.user = user;
    req.token = token;
    next();
})

export const admin = (req,res,next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    } else {
        return res.staus(403).json({
            success: false,
            message: "Forbidden, admin access required"
        })
    }
}