const express = require("express");
const env = require("dotenv");
const app = express();

const userRouter = require("./router/users");

//setup...
env.config();
app.use(express.json());

//router...
app.use("/api",userRouter);





//server...
app.listen(process.env.port,()=>{
	console.log(`Server connected ${process.env.port}`)
})
