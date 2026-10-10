import express from "express"
import errorMiddleware from "./middleware/errorMiddleware.js"
import healthCheck from "./route/healthCheck.route.js"
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use(healthCheck);



//Global Middleware
app.use(errorMiddleware)


export default app;