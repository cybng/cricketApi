const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
	  agentBalance:{
		type:String,
		default:"00"
	}

},{timestamps:true})

module.exports = mongoose.model("agent",agentSchema);