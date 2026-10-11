import { date, z } from "zod"

export const createEventSchema = z.object({
    title: z.string().trim().min(5,"Title must be atleast 5 charcters").max(100, "Title cannot exceed more than 100 charcters "),
    description: z.string().trim().min(20, "Description must be atleast 20 charcters").max(2000, "Description cannot exceed more than 2000 charcters"),
    date: z.coerce.date({error: "Event date is required"}).refine((date)=> date > new Date(), "Event date must be in the future"),
    location: z.string().trim().min(8, "Location must be atleast 8 charcters").max(150,"Location cannot exceed more than 150 charcters"),
    category: z.string().trim().min(5, "category must be atlast 5 charcters").max(50, "category cannot exceed more than 50 charcters"),
    totalSeats: z.coerce.number().int("Total seats must be whole number").min(1, "Atleast 1 seat is required").max(100000, "Seats cannot exceed 100000"),
    availableSeats: z.coerce.number().int("Availbale seats must be whole number").min(0, "Availabel seats cannot be negative").max(100000, "Availabel seats cannot exceed 100000"),
    ticketPrice: z.coerce.number().finite("Ticket price must be a vaild number").min(0, "Ticket price cannot be neagtive").max(1000000, "Ticket price cannot exceed ₹10,00,000"), 
}).refine((data) => data.availableSeats <= data.totalSeats,{
    path: ["availableSeats"],
    message: "Availbale seats cannot exceed total seats"
});