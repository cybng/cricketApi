const {msg} = require("./Messages");
exports.returnError = (status,msgKey,res)=>{
     return res.status(status).json({msg:`${msg[msgKey]}`});
}
exports.returnSuccess = (status,data,res)=>{
     return res.status(status).json(data);
}