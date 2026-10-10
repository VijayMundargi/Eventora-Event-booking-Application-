import app from "./app.js";
import http from "http"

const server = http.createServer(app);

const PORT = 8000;

app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Ok"
    })
})

server.listen(PORT,()=>{
    console.log(`server is running on PORT:${PORT}`);
    
})