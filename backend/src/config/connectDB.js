import mongoose from "mongoose"
import {ENV} from "./ENV.js"


const connectDb = async() => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log(`database connected succefully!!`);
        
    } catch (error) {
        console.log(`database error `, error);
        
        process.exit(1);
    }
}


export default connectDb