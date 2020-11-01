const express=require('express')
var app=express()
const cors=require('cors')
const db=require('./db')
var controller=require('./Auth/controller')
var port=process.env.PORT || 7800

app.use('/app/auth',controller)
app.use(cors());


app.listen(port,(err)=>{
    if (err) throw err
    console.log(`server is running on PORT${port}`)
})