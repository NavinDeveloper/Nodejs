var express=require('express')
var app=express();
var port=process.env.PORT || 9520
var menu=[{'name':'Home','link':'/'},{'name':'City','link':'/city'},{'name':'Restaurant','link':'/restaurant'}]
var restaurantRouter=require('./src/router/RestaurantRouter')(menu);
var cityRouter=require('./src/router/cityRouter')(menu);



//static files
app.use(express.static(__dirname+'/public'))

//html
app.set('views','./src/views')
//view engine
app.set('view engine','ejs')

app.use('/restaurant',restaurantRouter)
app.use('/city',cityRouter)



app.get('/',function(req,res){
    res.render('home',{title:"Home Page",menu:menu})
})
/*
app.get('/',function(req,res){
    res.send("<h1>This is Node</h1>")
})*/

/*
app.get('/city',function(req,res){
    res.send(city)
})

app.get('/restaurant',function(req,res){
    res.send(restaurant)
})*/

app.listen(port,(err)=>{
    if (err) throw err
    console.log(`server is running on port ${port}`)

})