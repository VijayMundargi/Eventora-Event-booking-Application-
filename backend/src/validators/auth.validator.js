import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().trim().min(3, "Name must be atleast 3 characters").max(50, "Name cannot be exceed 50 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email address").max(254, "Email is too long"),
    password: z.string().min(8, "Password must be atlest 8 characters").max(72, "Password cannot exceed 72 characters"),
})


export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(254, "Email is too long"),
    password: z.string().min(1, "password is required")
})

export const verifyOtpSchema = z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
    otp: z.string().regex(/^\d{6}$/, "OTP must contain exactly 6 digits"),
    
})