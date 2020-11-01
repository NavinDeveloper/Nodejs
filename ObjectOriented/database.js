import mongodb from 'mongodb';
const MongoClient=mongodb.MongoClient;
const url="mongodb://localhost:27017";
var dbname="nodeat10";

const Maincall={};
var output
Maincall.getData=(collection_name)=>{
    MongoClient.connect(url,(err,dc)=>{
        if(err) throw err;
        var dbo=dc.db(dbname);
        dbo.collection(collection_name).find({}).toArray((err, data)=>{
            if(err) throw err;
           // console.log(data)
             output=JSON.stringify(data)
            })
            // console.log("my"+JSON.stringify(output))
        })
        return output;
    }
    

Maincall.postData=(collection_name,datatoPost)=>{
    MongoClient.connect(url,(err,dc)=>{
        if(err) throw err;
        var dbo=dc.db(dbname);
        dbo.collection(collection_name).insert(datatoPost,(err,data)=>{
            if(err) throw err;
            console.log('Data Added')
            //dc.close();
        })
           
        })
        let out=`Data insert in ${collection_name}`
    return out;
}

export default Maincall