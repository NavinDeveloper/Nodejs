var express=require('express')
var expressfs=require('fs')
var app= express();
var port =process.env.PORT || 8050


app.get('/',function(req,res){
    res.send('<b> Hii from Express</b>')
})

app.get("/about",(req,res)=>{
    res.send("this is about")
})

app.get("/about",(req,res)=>{
    res.send("this is about2")
})

app.get("/data",(req,res)=>{
    expressfs.readFile('db.json','utf-8',function(err,data){
        if(err) throw err
        res.send(data)
    })
})

app.listen(port,(err)=>{
    if(err) throw err
    console.log(`Server is listing on port ${port}`)
})