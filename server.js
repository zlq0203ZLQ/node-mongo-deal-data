let express = require('express')
let app = express()

const bodyParser = require('body-parser')
let router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))  

router.post('/adduser',(req, res, next)=>{
    console.log(req.body)
    res.send('添加成功')
})

app.use(router)

app.listen(3003,()=>{
    console.log("start")
})