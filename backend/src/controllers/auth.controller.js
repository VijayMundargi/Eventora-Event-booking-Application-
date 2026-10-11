import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/user.model.js"
import { sendOtpEmail } from "../utils/email.js";
import otpModel from "../models/otp.model.js"
import jwt from "jsonwebtoken"
import { ENV } from "../config/ENV.js"
import bcrypt from "bcrypt"
const generateToken = (id, role) => {
    return jwt.sign({id, role}, ENV.JWT_SECREAT, {expiresIn: '7d'})
}


export const registerUser = asyncHandler(async(req,res,next)=> {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        throw new ApiError(400, "Please enter all the fields");
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ApiError(409, "Email is alredy registred");
    }

    const user = await User.create({
        name,
        email,
        password,
        role: "user",
        isVerified: false
    })

    const createdUser  = {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP for ${email}: ${otp}`);

      await otpModel.create({
        email,
        otp,
        action:"account_verification",
    })
    await sendOtpEmail(email, otp, "account_verification")

    res.status(201).json({
        success: true,
        message: "User registred succefully. Please check your email to verify account",
        email: user.email
    })
})


export const loginUser = asyncHandler(async(req,res,next)=> {
    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(400, "Please fill all the fields")
    }

    const user = await User.findOne({ email }).select("+password");
    if(!user){
        throw new ApiError(404, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new ApiError(401, "Invalid email or password")
    }

    if(!user.isVerified && user.role === "user"){
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await otpModel.deleteMany({
            email,
            action: "account_verification"
        });

        await otpModel.create({
            email,
            otp,
            action: "account_verification"
        });

        await sendOtpEmail(email, otp, "account_verification");

        return res.status(400).json({
            success: false,
            message: "Account not verified. A new OTP has been sent to your email",
        })
    }

    res.status(200).json({
        success: true,
        message: "Login successfull",
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    })

})


export const verifyotp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const otpRecord = await otpModel.findOne({
        email,
        action: "account_verification",
    });

    if (!otpRecord) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    const isOtpValid = await bcrypt.compare(
        String(otp),
        otpRecord.otp
    );

    if (!isOtpValid) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    const user = await User.findOneAndUpdate(
        { email },
        { $set: { isVerified: true } },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await otpModel.deleteMany({
        email,
        action: "account_verification",
    });

    return res.status(200).json({
        success: true,
        message: "Account verified successfully",
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString(), user.role),
    });
});

