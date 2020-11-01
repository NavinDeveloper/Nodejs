var express=require('express');
var parser=require('body-parser');
const app=express();
var superagent=require('superagent');
var request=require('request')
var port=process.env.PORT || 7800

app.use(parser.json())
//static files
app.use(express.static(__dirname+'/public'))

//html
app.set('views','./src/views')
//view engine
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/user',(req,res)=>{
    
    const {code}=req.query;
    console.log(typeof(code))
    if(!code){
        res.send({
            success :false,
            message:'Error on login'
        })
    }
    superagent
    .get(`https://graph.facebook.com/v8.0/oauth/access_token?client_id=3256696537739307&redirect_uri=http://localhost:7800/user&client_secret=77c82431ebbacf948c63cac4379bd51d&code=${code}`)
    .set('Accept','application/json')
    .end((err,result)=>{
        if(err) throw err
        var accesstoken=result.body.access_token
       // console.log(`ACCAHILADLASJBAKAHAJ123456${accesstoken}`)
        const option ={
            url:`https://graph.facebook.com/me?input_token=navin&access_token=${accesstoken}`,
            method:'GET',
            headers:{
                'Accept':'application/json'
            }
        }
        var output;
        request(option,(err,response,body)=>{
            output=body;
            return res.send(output)
        })
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running on port${port}`)
})