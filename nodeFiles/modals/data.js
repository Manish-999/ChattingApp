// Model for MongoDB
const mongoose =require("mongoose"); 

var data = mongoose.Schema({
    name: {
       type:String,
       required:true
    },
    room: {
       type:String,
       required:true
    },
    id:{
        type:String,
        unique:true,
        required:true
    }
    
 })
 module.exports= mongoose.model("data",data)