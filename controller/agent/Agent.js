const User = require("../../modal/auth/userModal");
const Agent = require("../../modal/agent/agentModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {returnError,returnSuccess} = require("../../helper/ReturnStatus");

// save agent Detail in userModal
exports.addagent=(req,res)=>{
	User.findOne({username:req.body.username})
          .exec(async(err,data)=>{
            if(data){
                return returnError(201,0,res);
            }
            const {fname,lname,username,pass} = req.body;
            const password = await bcrypt.hash(pass,10);
            const userData = new User({
                fname,lname,username,password,role:"agent"
            });
            userData.save((err,data)=>{
                if(err){
                    return returnError(201,3,res);
                }
                if(data){
                   return agentModal(data._id,res);
                }

            });
          });

}
// save agent id and balance detail in agentModal
const agentModal = (agentId,res)=>{
     const agentData = new Agent({
     	agentId
     });
     agentData.save((err,data)=>{
     	if(err){
     	    return returnError(201,3,res);
     	}
     	if(data){
     		return returnSuccess(200,data,res);
     	}
     })
}

// get Agent Detail with joined table
exports.getagent=(req,res)=>{
	const agentJoin=User.aggregate([
  {
  	
    $lookup: {
      from: "agents",
      localField: "_id",
      foreignField: "agentId",
      as: "other",
    },
  },
  { $project: { password: false,"other.agentId":false} },

  {
    $unwind: "$other",
  },

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