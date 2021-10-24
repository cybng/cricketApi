const {check,validationResult} = require("express-validator");

exports.validReg=[
        check("fname").notEmpty().withMessage("Firstname is Required"),
        check("lname").notEmpty().withMessage("Lastname is Required"),
        check("username").notEmpty().withMessage("Username is Required"),
        check("pass").isLength({min:6}).withMessage("Password Min 6 Digit is Required"),
];

exports.valigLogin=[
        check("username").notEmpty().withMessage("Username is Required"),
        check("pass").isLength({min:6}).withMessage("Password Min 6 Digit is Required"),
];


exports.isValid = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
    	return res.status(201).json({error:errors.array()[0].msg});
    }
    next();
}