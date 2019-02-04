var express = require('express');
var app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');
var User = require('./models/User');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Test');
});

app.get('/users', function (req, res) {
    const { search, page } = req.query;
    let query = {};
    let options = {}
    if(search.length > 0) {
        query = { userName: new RegExp('^'+search+'$', "i")}
    } else {
        options = { page: page, limit: 2 };
    }

    User.paginate(query, options, function(err, data){
        if (err) {
            res.status(500);
            res.send(err);
        }

        res.send(data);
    })
});

app.post('/users', function (req, res){
    const { userName, email, password } = req.body;
    const user = new User({
        userName: userName,
        email: email,
        password: password
    })
    user.save(function(err) {
        if (err) {
            res.status(500);
            res.send(err);
        }
         
        console.log('Successfully saved.');
        return res.status(200);
    });
});

app.listen(3001, function () {
  console.log('App listening on port 3001!');
});

mongoose.connect("mongodb://localhost:27017/toast", { useNewUrlParser: true });