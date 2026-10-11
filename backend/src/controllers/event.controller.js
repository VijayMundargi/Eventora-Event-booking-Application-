import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import eventModel from "../models/event.model.js";

export const getAllEvents = asyncHandler(async(req,res,next) => {

    const filters = {};
    if(req.query.category){
        filters.category = req.query.category;
    }

    if(req.query.location){
        filters.location = req.query.location;
    }

    if(req.query.ticketPrice){
        filters.ticketPrice = req.query.ticketPrice;
    }

    if(req.query.title){
        filters.title = req.query.title;
    }

    const events = await eventModel.find();
    res.status(200).json({
        success: true,
        message: "Events featched successfully"
    })
})

export const getEventById = asyncHandler(async(req,res,next) => {

    const events = await eventModel.findById(req.params.id);
    if(!events){
       return res.status(404).json({
        success: false,
        message: "Event not found"
       })
    }

})

export const createEvent = asyncHandler(async(req,res,next) => {
    const { title, description, date, location, category, totalSeats, availableSeats, ticketPrice, imageUrl } = req.body;
    if(!title || !description || !date || !location || !category || !totalSeats || !availableSeats || !ticketPrice || !imageUrl){
        throw new ApiError(400, "Please fill all the fields")
    }
    const event = await eventModel.create({
        title, 
        description, 
        date, 
        location, 
        category, 
        totalSeats, 
        availableSeats, 
        ticketPrice, 
        imageUrl
    })

    const createdEvent = {
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        category: event.category,
        totalSeats: event.totalSeats,
        availableSeats: event.availableSeats,
        ticketPrice: event.ticketPrice,
    }

    res.staus(201).json({
        success: true,
        message: "Event created successfully!",
       createdEvent,
    })
})

export const updateEvent = asyncHandler(async(req,res,next) => {
    const { title, description, date, location, category, totalSeats, ticketPrice, imageUrl } = req.body;
    const event = await eventModel.findByIdAndUpdate(req.params.id, {
        title, 
        description, 
        date, 
        location, 
        category, 
        totalSeats, 
        ticketPrice, 
        imageUrl
    }, {new: true});

    if(!event){
        return res.status(404).json({
            success: false,
            message: "Event not found"
        })
    }

    const createdEvent = {
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        category: event.category,
        totalSeats: event.totalSeats,
        ticketPrice: event.ticketPrice,
    }

    res.status(201).json({
        success: true,
        message: "Evenet updated successfully",
        createdEvent
    })

})

export const deleteEvent = asyncHandler(async(req,res,next) => {
        const { title, description, date, location, category, totalSeats, ticketPrice, imageUrl } = req.body;
    const event = await eventModel.findByIdAndDelete(req.params.id, {
        title, 
        description, 
        date, 
        location, 
        category, 
        totalSeats, 
        ticketPrice, 
        imageUrl
    }, {new: true});

    if(!event){
        return res.status(404).json({
            success: false,
            message: "Event not found"
        })
    }

    res.status(200).json({
        success: false,
        message: "Event deletd succssfully!"
    })
})