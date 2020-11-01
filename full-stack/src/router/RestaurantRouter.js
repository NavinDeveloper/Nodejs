var express=require('express')
var restaurantRouter=express.Router();
var mongodb=require('mongodb').MongoClient;
var url="mongodb://localhost:27017"
//var restaurant=[{"name":"Kaveri","id":"KAV123"},{"name":"BARBEQUE","id":"Bar246"}]

function router(menu){
    restaurantRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url,(err,dc)=>{
            if(err){
                res.status(400).send('Error While connecting')
            }
            else{
                const dbo=dc.db('restaurants')
                dbo.collection('restaurant').find({}).toArray((err,data)=>{
                    if(err){
                        res.status(400).send('Error While Fetching')
                    }
                    else{
                        res.render('restaurant',{title:"Restaurant Page",menu,restaurant:data})
                    }
                })
            }
        })
       // res.send(restaurant)
       //res.render('restaurant',{title:"Restaurant 2 Page",menu,restaurant:restaurant})
    })

restaurantRouter.route('/details')
    .get(function(req,res){
        res.send('restaurant details')
    })

    restaurantRouter.route('/details/:id')
    .get(function(req,res){
        var id=req.params.id;
        //var {id}=req.params;
       // res.send('restaurant details')
       mongodb.connect(url,(err,dc)=>{
        if(err){
            res.status(400).send('Error While connecting')
        }
        else{
            const dbo=dc.db('restaurants')
            dbo.collection('restaurant').findOne({_id:parseInt(id)},(err,data)=>{
                if(err){
                    res.status(400).send('Error While Fetching')
                }
                else{
                    res.render('restaurantDetails',{menu:menu,details:data})
                }
            })
        }
    })
       
    })
return restaurantRouter
}

module.exports=router;
