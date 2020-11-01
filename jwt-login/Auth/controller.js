const express=require('express')
const router=express.Router();
const parser=require('body-parser')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const config=require('../config')
const usercollection=require('./userShema')
router.use(parser.urlencoded({extended:true}))
router.use(parser.json())

router.post('/register',(req,res)=>{
    var hasedpassword=bcrypt.hashSync(req.body.password,8);
    usercollection.create({
        name:req.body.name,
        email:req.body.email,
        password:hasedpassword,
        role:req.body.role? req.body.role:'User'
    },(err,user)=>{
        if(err){
            return res.status(500).send("Error while Register")
        }
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested=With,Content-Type,Accept')
        res.status(200).send('Registration successful')
    })

})

router.post('/login',(req,res)=>{
    var email=req.body.email;
    usercollection.findOne({email:email},(err,user)=>{
        if(err) return res.status(500).send('Error connecting to server')
        if(!user) return res.status(404).send('User Not Found')
        
        else{
            console.log(user)
            const passIsvalid=bcrypt.compareSync(req.body.password,user.password)
            if(!passIsvalid) return res.status(401).send({auth:false,message:"Unauthorized",token:null})
            var token=jwt.sign({id:user._id},config.secret,{expiresIn:86400});
            return res.status(200).send({message:'Login successful !!!',auth:true,token:token})
        }
    })


})

router.get('/userInfo',(req,res)=>{
    var token=req.headers['x-csrf-token'];
    console.log(`token : ${token}`)
    if(!token) return res.status(401).send({auth:false,token:"Not provided"})
    jwt.verify(token,config.secret,(err,data)=>{
        //console.log(JSON.stringify(data))
        if(err) return res.status(500).send('Error in token')
        usercollection.findById(data.id,{password:0},(err,user)=>{
            if(err) return res.send('Error finding user')
            if(!user) return res.send('No user found')
            res.send(user)

        })
    })
})

router.get('/users',(req,res)=>{
 usercollection.find({},{password:0},(err,users)=>{
        if(err) return res.status(500).send('Error connecting')
        if(!users) return res.status(200).send('No users avilable')
           else{ 
               return res.send(users)
           }
        })
    })

module.exports=router