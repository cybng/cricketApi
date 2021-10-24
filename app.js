const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();

const userRouter = require("./router/users");
const agentRouter = require("./router/Agent");

//setup...
env.config();
app.use(express.json());

//router...
app.use("/api",[userRouter,agentRouter]);




mongoose.connect("mongodb://localhost:27017/crick").then(()=>{
	console.log("Database connected...");
})
//server...
app.listen(process.env.port,()=>{
	console.log(`Server connected ${process.env.port}`)
})
