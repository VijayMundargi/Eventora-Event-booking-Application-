import app from "./src/app.js";
import http from "http"
import { ENV } from "./src/config/ENV.js";
import connectDb from "./src/config/connectDB.js"
const server = http.createServer(app);

const PORT = ENV.PORT;

connectDb()
server.listen(PORT,()=>{
    console.log(`server is running on PORT:${PORT}`);
    
})