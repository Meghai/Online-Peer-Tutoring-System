var mysql = require("mysql");
var pool = mysql.createPool({
host: "localhost",
user: "root",
password:"",
database:"peer_tutoring"
});
module.exports = pool;
