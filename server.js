const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


//this is a connection to Mongodb Atlas
const connecString = "mongodb+srv://root:root@cluster0-j3gjt.mongodb.net/test?retryWrites=true&w=majority";


MongoClient.connect(connecString, {useUnifiedTopology : true})
    .then(client=>{
        const db = client.db('star-wars-qutoes');
        const quotesCollection = db.collection('quotes');

        app.set('view engine','ejs');

        //sample post, and redirect to the root address 
        app.post('/quotes',(req,res)=>{
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        
        app.get('/',(req,res)=>{
            const cursor = db.collection('quotes').find();
            console.log(cursor);
        })
        .catch(error => console.error(error))


    })


//to 3000 port
app.listen(3000,function(){
    console.log('prot 3000');
})

app.use(bodyParser.urlencoded({extended: true}))
// app.get('/',(req,res) => {
//     res.sendFile(__dirname+"/index.html");
// })

