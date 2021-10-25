const User = require("../../modal/auth/userModal");
const Agent = require("../../modal/agent/agentModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {returnError,returnSuccess} = require("../../helper/ReturnStatus");
const {twoTableSave} = require("../../helper/TwoTableExtention");

// save agent Detail in userModal
exports.addagent=(req,res)=>{
	User.findOne({username:req.body.username})
          .exec(async(err,data)=>{
            if(data){
                return returnError(201,0,res);
            }
            const {fname,lname,username,pass} = req.body;
            const password = await bcrypt.hash(pass,10);
            const userData = {fname,lname,username,password,role:"agent"}
            const secondData = {agentBalance:"00"}
            twoTableSave(User,userData,Agent,secondData,res);
          });

}


// get Agent Detail with joined table
exports.getagent=(req,res)=>{
	const agentJoin=User.aggregate([
  	   {
  		$lookup: {
  	      from: "agents",
  	      localField: "_id",
  	      foreignField: "_id",
  	      as: "other",
  	     },
  	   },
     { $project: { password: false,"other.agentId":false} },
     {$unwind: "$other"},
  ]);
  agentJoin.exec((err,data)=>{
		if(err){
			return returnError(201,3,res);
		}
		if(data){
			return returnSuccess(200,data,res);
		}
    });
}