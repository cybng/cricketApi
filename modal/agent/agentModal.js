const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
	agentId:{
		type:mongoose.Schema.ObjectId,
		default:null
	},
	agentBalance:{
		type:String,
		default:"00"
	}

},{timestamps:true})

module.exports = mongoose.model("agent",agentSchema);