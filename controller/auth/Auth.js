const User = require("../../modal/auth/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {returnError,returnSuccess} = require("../../helper/ReturnStatus");



exports.login=(req,res)=>{
     User.findOne({username:req.body.username})
         .exec(async(err,data)=>{
            if(err){
                return returnError(201,3,res);
            }
            if(data){ 
              const checkPassword = await data.authenticate(req.body.pass);
              if(checkPassword && (data.role=="admin" || data.role=="user" || data.role=="agent")){
                const token = jwt.sign({_id:data._id,role:data.role},process.env.r4h,{expiresIn:"1d"});
                const {_id,fname,lname,username,role,profilePic,fullName} = data;
                res.cookie("token",token,{expiresIn:"1d"});
                const userData={token,user:{_id,fname,lname,username,role,profilePic,fullName}}
                return returnSuccess(200,userData,res);
              }else{
                return returnError(201,4,res);
              }
            }else{
                return returnError(201,5,res);
            }
         })
}

exports.reg=(req,res)=>{
      User.findOne({username:req.body.username})
          .exec(async(err,data)=>{
            if(data){
                return returnError(201,0,res);
            }
            const {fname,lname,username,pass} = req.body;
            const password = await bcrypt.hash(pass,10);
            const userData = new User({
                fname,lname,username,password
            });
            userData.save((err,data)=>{
                if(err){
                    return returnError(201,3,res);
                }
                if(data){
                   return returnError(200,1,res);
                }

            });
          });
}

