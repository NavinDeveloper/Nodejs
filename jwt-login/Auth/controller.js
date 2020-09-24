const express=require('express')
const router=express.Router();
const parser=require('body-parser')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const config=require('../config')
const user=require('./userShema')
router.use(parser.urlencoded({extended:true}))
router.use(parser.json())

router.post('/register',(req,res)=>{
    var hasedpassword=bcrypt.hashSync(req.body.password,8);
    user.create({
        name:req.body.name,
        email:req.body.email,
        password:hasedpassword,
        role:req.body.role? req.body.role:'User'
    },(err,users)=>{
        if(err){
            return res.status(500).send("Error while Register")
        }
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested=With,Content-Type,Accept')
        res.status(200).send('Registration successful')
    })

})

module.exports=router