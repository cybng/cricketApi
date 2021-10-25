const {returnError,returnSuccess} = require("./ReturnStatus");

// save Dynamic Any two table data at the same time for easily joining with Id
exports.twoTableSave = (firstModal,firstModalData,secondModal,secondModalData,res)=>{
          const firstTable = new firstModal(firstModalData);
            firstTable.save((err,data)=>{
                if(err){
                    return returnError(201,3,res);
                }
                if(data){
                   var obj = Object.assign({ _id:data._id }, secondModalData);
                   const secondTable = new secondModal(obj);
                   secondTable.save((err,data)=>{
                    if(err){
                        return returnError(201,3,res);
                    }
                    if(data){
                         return returnSuccess(200,data,res);
                    }
                  })
                }

            });


     
}