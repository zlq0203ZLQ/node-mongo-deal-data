let MongoClient = require('mongodb').MongoClient
let DB_COUN_STR = 'mongodb://localhot:27017/users'

module.exports = {
    getDB: function (callback) {
        MongoClient.connect(DB_COUN_STR, (err,db)=>{
            callback(db)
        })
    }
}