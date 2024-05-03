var mysql = require("mysql");
var con = mysql.createConnection({
host: "localhost",
user: "root",
password:"",
database:"peer_tutoring"
});
module.exports = con;
