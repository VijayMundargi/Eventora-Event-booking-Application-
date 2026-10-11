
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email is required"],
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ],
    },

    otp: {
        type: String,
        required: [true, "OTP is required"],
    },

    action: {
        type: String,
        enum: ["account_verification", "event_booking"],
        required: [true, "Action is required"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
});

otpSchema.pre("save", async function(){
    if(!this.isModified("otp")) return;
    this.otp = await bcrypt.hash(this.otp, 12);
})

export default mongoose.model("Otp", otpSchema);
