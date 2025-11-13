import express from "express";
const app= express()
import dotenv from "dotenv"
import addEmployeRoute from './routes/employee.route.js'
dotenv.config()
app.use(express.json())
app.use("/api/v1/employee", addEmployeRoute)
app.listen(process.env.PORT, ()=>{
    console.log("server is running on", process.env.PORT);
})
