const User = require("../../modal/auth/userModal");
const {msg} = require("../../helper/Messages");
exports.login=(req,res)=>{
    return res.status(200).json({data:"login Successfull"});
}

exports.reg=(req,res)=>{
      User.findOne({username:req.body.username})
          .exec((err,data)=>{
            if(data){
                return returnStatus(201,0,res);
            }
            const {fname,lname,username,password} = req.body;
            const userData = new User({
                fname,lname,username,password
            });
            userData.save((err,data)=>{
                if(err){
                    return returnStatus(201,3,res);
                }
                if(data){
                   return returnStatus(200,1,res);
                }

            });
          });
}

const returnStatus = (status,msgKey,res)=>{
     res.status(status).json({msg:`${msg[msgKey]}`});
}