import express from "express"
import cors from "cors"
import helmet from "helmet"
import errorMiddleware from "./middleware/errorMiddleware.js"
import healthCheck from "./routes/healthCheck.route.js"
import authRoutes from "./routes/auth.route.js"
import eventRoutes from "./routes/event.route.js"
import bookingRoutes from "./routes/booking.route.js"
import { globalLimiter } from "./middleware/raterLimite.js"

const app = express();

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
    optionsSuccessStatus: 200
}

app.use(helmet());
app.use(cors(corsOption));



app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({extended:true, limit: "1mb"}));


//routes
app.use("/api", globalLimiter)
app.use(healthCheck);
app.use("/api/auth",authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/booking", bookingRoutes);


//Global Middleware
app.use(errorMiddleware)


export default app;