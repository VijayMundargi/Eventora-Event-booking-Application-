import express from "express"
import cors from "cors"
import helmet from "helmet"
import errorMiddleware from "./middleware/errorMiddleware.js"
import healthCheck from "./route/healthCheck.route.js"
import authRoutes from "./route/auth.route.js"

const app = express();

const corsOption = {
    origin: 'http://localhost:5173',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
    optionSuccessStatus: 200
}

app.use(helmet());
app.use(cors(corsOption));



app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes
app.use(healthCheck);
app.use("/api/auth",authRoutes)


//Global Middleware
app.use(errorMiddleware)


export default app;