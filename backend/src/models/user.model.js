import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be atleast 3 charcters"],
        maxlength: [50, "Name cannot exceed more than 50 charcters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
        
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Passwotd must be atleast 8 charcters"],
        maxlength: [64, "Password cannot exceed 64 charcters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})


userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
})

export default mongoose.model("User", userSchema);
