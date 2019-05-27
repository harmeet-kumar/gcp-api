var express = require("express");
var mysql = require('mysql');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true
    })); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    }); 
console.log('--------------------------------------');
console.log(process.env);
console.log('--------------------------------------');

console.log('-------------Variables----------------');
var hostname  = process.env.DB_HOST;
var username = process.env.DB_USER;
var pwd= process.env.PASSWORD;

console.log("Original : "+process.env.DB_HOST + " Saved Host name : " + hostname);
console.log("Original : "+process.env.DB_USER+" Saved User name : " + username);
console.log("Original : "+process.env.PASSWORD+" Saved Password : " + pwd);

console.log('------------END Variable----------------');



var con = mysql.createConnection({
  host: hostname,
  user: username,
  password: pwd,
  database: "GCP"
});
con.connect(function(err) {
  if (err) { 
    console.log(err) 
  } else {
    console.log("Connected!");
  }
});
app.get("/users", (req, res, next) => {
  //res.json(users);
  return getAllUsers(res);
  
 });

var getAllUsers = function (res) {
  con.query('SELECT * FROM GCP.Users;', function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json(result);
    }
    console.log("Result: " + result);
  });
}
app.post("/addUser",  (req, res) => {
  console.log(req.body)
  var obj = {}
  obj.Name = req.body.Name;
  obj.Age = req.body.Age;
  obj.Address = req.body.Address;
  obj.Email = req.body.Email;
  if(obj.Name.trim()!="") {
      users.push(obj);
  }
  sql = 'INSERT INTO `GCP`.`Users`(`Name`,  `Age`,`Address`,`Email`)VALUES (name1,age1,address1,email1)';
  sql = sql.replace('name1','"'+req.body.Name+'"');
  sql = sql.replace('age1',req.body.Age);
  sql = sql.replace('address1','"'+req.body.Address+'"');
  sql = sql.replace('email1','"'+req.body.Email+'"');
  console.log(sql)
  con.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("Result: " + result);
    if(result.affectedRows == 1) {
      console.log(result.insertId);
    }
    return getAllUsers(res);
  });
  //res.json(users);
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
 console.log("Server running on port :" + PORT);
}); 
