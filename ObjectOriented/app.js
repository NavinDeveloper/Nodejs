import express from 'express';
var app=express();
const port =8080
import database from './database';

app.get('/data',(req,res)=>{
    let output=database.getData('first')
   // console.log("nkm,l"+output)
   //res.setHeader('Accept','application/json')
    res.status(200).send(output)
})

app.post('/addData',(req,res)=>{
    var data={"name":"navin","age":"23"}
    let output=database.postData('first',data)
    res.send(output)
})

app.listen(port)