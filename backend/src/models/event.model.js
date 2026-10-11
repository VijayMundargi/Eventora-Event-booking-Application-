import mongoose from "mongoose"



const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        minLength: [5, "Event title must be atleast 5 charcters"],
        maxlength: [100, "Evenet title cannot exceed more than 100 charcters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [20, "Description must be atleast 20 charcters"],
        maxlength: [2000, "Description cannot exceed more than 2000 charcters"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
        validate: {
            validator: (value) => value > new Date(),
            message: "Event date must be in the feature"
        }
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,   
        minlength: [8, "Location must be atleast 8 charcters"],
        maxlength: [150,"Location cannot exceed more than 150 charcters"]
    },
    category: {
        type: String,
        required: [true, "category is required"],
        trim: true,
        minlength: [5, "category must be atlast 5 charcters"],
        maxlength: [50, "category cannot exceed more than 50 charcters"]
    },
    totalSeats: {
        type: Number,
        required: [true, "Total number of seat is required"],
        min: [1, "total seast must have atleast 1 Seats"],
        max: [100000, "Seats cannot exceed 100000"],
        validate: {
            validator: Number.isInteger,
            message: "Total seats must be a whole number",
        }
    },
    availableSeats: {
        type: Number,
        required: [true, "Availabel Seats is required"],
        min: [0, "Availabel seats cannot be negative"],
        max: [100000, "Availabel seats cannot exceed 100000"],
        validate: {
            validator: Number.isInteger,
            message: "Availbale seats must be a whole number"
        }
    },
    ticketPrice: {
        type: Number,
        required: [true, "Ticket price is required"],
        min: [0, "Ticket price cannot be neagtive"],
        max: [1000000, "Ticket price cannot exceed ₹10,00,000"]
    },
    imageUrl: {
        type: String,
        required: [true, "image is required"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner id is required"]
    }
}, {timestamps: true})

eventSchema.pre("validate", function() {
    if(this.availableSeats > this.totalSeats){
        this.invalidate("availableSeats", "Available seats cannot exceed total seats")
    }
})


export default mongoose.model("Event", eventSchema);