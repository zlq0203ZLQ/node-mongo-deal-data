let express = require('express')
let app = express() 
const bodyParser = require('body-parser')
let router = express.Router()

// let fs = require('fs')
// let ObjectID = require('mongodb').ObjectID

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))  


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/',(req,res,next)=>{
    res.send('Hello MongoDB')
})

router.get('/findAllPerson',(req, res, next)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        let dbo = db.db("users")
        dbo.collection("students"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err
            console.log(result)
            res.send(result)
            db.close();
        });
    });
})

router.get('/findPersonByName',(req, res, next)=>{
    MongoClient.connect(url, {useNewUrlParser: true }, (err, db)=>{
        if (err) throw err
        let dbo = db.db('users')
        console.log(req.query)
        let whereStr = {"name": req.query.name}
        dbo.collection('students').find(whereStr).toArray((err, result)=>{
            if (err) throw err
            console.log(result)
            res.send(result)
            db.close()
        })
    })
})

router.post('/addUser', (req, res, next)=>{
    MongoClient.connect(url, {useNewUrlParser: true },(err, db)=>{
        if (err) throw err
        let dbo = db.db('users')
        let myobj = {
            "name": req.body.name,
            "age": req.body.age
        }
        dbo.collection("students").insertOne(myobj,(err, result)=>{
            if (err) {
                console.log("Err:" + err)
                return
            }
            res.send({"msg":"添加成功"})
            db.close()
        })
    })
})
router.put('/', (req, res, next)=>{
   MongoClient.connect(url, {useNewUrlParser: true},(err, db)=>{
       if (err) throw err
       let dbo = db.db('users')
       let whereStr = {
           "name": req.body.name 
       }
       let newObj = {
           "age": req.body.age,
           "name": req.body.name
       }
       dbo.collection("students").updateOne(whereStr, newObj, (err,result)=>{
           if (err) throw err
        //    console.log(result)
           res.send('更新成功')
           db.close()
       })
   })  
})

router.delete('/', (req, res, next)=>{
    MongoClient.connect(url, { useNewUrlParser: true}, (err, db)=>{
        if (err) throw err
        let dbo = db.db('users')
        let whereStr = {"name": req.body.name}
        dbo.collection("students").deleteOne(whereStr, (err, result)=>{
            if (err) throw err
            res.send('删除成功')
            db.close()
        })
    })
})

app.use(router)

app.listen(3002,()=> console.log('success'))