var express=require('express')
var cityRouter=express.Router();

var city=[{"name":"Ranchi","id":"835222"},{"name":"Patna","id":"8000026"}]

function router(menu){
    cityRouter.route('/')
    .get(function(req,res){
        //res.send(city)
        res.render('city',{title:"City Page",menu:menu,city:city})
    })


cityRouter.route('/details')
    .get(function(req,res){
       res.send('city Details')
       
    })
    return cityRouter;
}


module.exports=router;