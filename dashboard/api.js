var express=require('express');
var app=express();
var mongodb=require('mongodb');
var mongoClient=mongodb.MongoClient;
var bodyParser=require('body-parser');
var port=process.env.PORT || 9520;
var cors=require('cors');
var mongourl="mongodb://localhost:27017";

let dbo; //database connection Object
let collection_name="users_table";
var obj={};
var obj1={};



app.use(bodyParser.json())

app.get('/',function(req,res){
    res.status(200).send("Health checkup : server is up and running")
})

app.get('/users',(req,res)=>{
    var id=req.query.id
    if(!req.query.id){
       return res.status(400).send(`id is mandatory`)
    }
    //console.log('xnmk')
    var query={}
    if(req.query.id){
        query={_id:parseInt(req.query.id)}
    }
    else if(req.query.city && req.query.name){
        query={city:req.query.city,isActive:true,name:req.query.name}
    }
    else if(req.query.name){
        query={name:req.query.name,isActive:true}
    }
    else{
        query={isActive:true}
    }
    console.log(query)
    console.log('navin')
    dbo.collection(collection_name).find(query).toArray((err,data)=>{
        if(err) res.setHeader(Accept,"application/json").send(err);
       // obj['user']=data;
      // obj=data[0];
       //obj1={d:obj.name}

        //console.log(obj)
        //console.log(JSON.stringify(obj))
        res.send(data)
    })
    //console.log(data)
})
app.post('/add-user',(req,res)=>{
    console.log(req.body);
   // res.setHeader("msg","ok");
    //res.status(201);
    //res.send('')
    dbo.collection(collection_name).insert(req.body,(err,result)=>{
        if(err) {
            res.header("Content-Type","application/json")
            res.status(400).send(err)
        }
        res.status(201).send("Data Added")
    })
})

app.put('/update-user',(req,res)=>{
    var id=req.body._id;
    console.log(id)
    dbo.collection(collection_name).update({_id:id},{
        $set:{
        "name":req.body.name,
        city:req.body.city,
        Mobile:req.body.Mobile,
        isActive:true
        },
        $unset:{mobile:""}
        
    },(err,data)=>{
        if(err) throw err
        res.status(204).send("")
    })
})

app.delete('/delete-user',(req,res)=>{
    dbo.collection(collection_name).update({_id:req.body._id},{$unset:{"name":""}},(err,result)=>{
        if(err) throw err
        res.send('data deleted')
    })
})


mongoClient.connect(mongourl,(err,dc)=>{
    if(err) throw err;
    dbo=dc.db('dashboard');  // database connection
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`server is running on port${port}`);
    })
})