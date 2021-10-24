const User = require("../../modal/auth/userModal");
exports.login=(req,res)=>{
    return res.status(200).json({data:"login Successfull"});
}

exports.reg=(req,res)=>{
      return res.status(200).json(req.body);
}