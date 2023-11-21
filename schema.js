// creating a schema for storing task details into Database(DB)...
const mongoose=require('mongoose');

// using mongoose package
const todoschema=new mongoose.Schema({
    description:{type:String,required:true},
    category:{type:String},
    date:{type:String}
});

const TODO=mongoose.model('TODO',todoschema);
module.exports=TODO;