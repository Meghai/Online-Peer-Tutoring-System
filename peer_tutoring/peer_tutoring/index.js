var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var con= require('./public/script/connection');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'html/signup.html'));
    });
//app.get('/signup',function(req, res) {
//res.sendFile(path.join(__dirname,'/signup.html'));
//});
app.post('/',function(req, res) {
var sfname = req.body.sfname;
var slname = req.body.slname;
var email = req.body.email;
var password = req.body.password;

con.connect(function(error) {
    if(error) throw error;
    var sql = "INSERT INTO student(sfname,slname, email, password) VALUES ?";
    var values = [
    [sfname,slname, email, password]
    ];
    con.query(sql, [values], function(error, result) {
    if(error) throw error;
    res.send('Student Register successfull '+result.insertId);
    });
    });
});
app.listen(3000);