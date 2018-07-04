const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
var bodyParser = require('body-parser');

var dbo;
var url = 'mongodb://localhost:27017/';

var app = express();
var port = 9090;

//========DB==========
MongoClient.connect(url,{ useNewUrlParser: true },(err,db)=>{
    if(err) throw err;
    console.log('DB Connected Successfully');
     dbo = db.db('library');
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/secrete')
                    .get((req,resp)=>{
                        var message = dbo.collection('crypto').findOne({},(err,result)=>{
                            if(err) throw err;
                            var message = result.message;
                            var mykey = crypto.createDecipher('aes256', 'asaadsaad');
                            var mystr = mykey.update(message, 'hex', 'utf8')
                                mystr += mykey.final('utf8');
                            console.log(mystr);
                            resp.end(mystr);
                        });
                    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port: ' + port);

