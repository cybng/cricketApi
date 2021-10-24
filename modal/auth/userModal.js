const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema=new mongoose.Schema({
	fname:{
		type:String,
		required:true,
		trim:true,
		max:20
	},
	lname:{
		type:String,
		required:true,
		trim:true,
		max:20
	},
	username:{
		type:String,
		required:true,
		trim:true,
		max:20
	},
	email:{
		type:String,
		default:null,
		trim:true,
		max:20
	},
	password:{
	    type:String,
	    required:true,
	    trim:true,
	    max:20
	},
	profilePic:{
		type:String,
		default:null
	},
	role:{
		type:String,
		enum:["admin","agent","user"],
		default:"user"
	}

},{timestamps:true});

userSchema.virtual("fullname").get(()=>{
    return(`${this.fname} ${this.lname}`);
})
userSchema.methods ={ 
	authenticate:async function(pass){
	return await bcrypt.compare(pass,this.password);
 }
}

module.exports = mongoose.model("user",userSchema);