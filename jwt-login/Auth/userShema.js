var mongoose=require('mongoose')
var userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
})

mongoose.model('usercollection',userSchema)
module.exports=mongoose.model('usercollection')
