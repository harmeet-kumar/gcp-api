var express = require("express");
var mysql = require('mysql');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true
    })); 
var users = [{
    "id": 1,
    "Name": "Ashok",
    "Age": 22,
    "Address": "Sector 21",
    "Email": "hadsask@sasdad.com"
  },
  {
    "id": 2,
    "Name": "Logan",
    "Age": 54,
    "Address": "Vehla",
    "Email": "hsadasdsdak@sadsad.com"
  },
  {
    "id": 3,
    "Name": "Mike Palvik",
    "Age": 32,
    "Address": "Dera Baba Nanak",
    "Email": "hsadsadasdsadk@saasdd.com"
  }];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    }); 

// var con = mysql.createConnection({
//   host: "34.66.247.73",
//   user: "root",
//   password: "root"
// });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
app.get("/users", (req, res, next) => {
  res.json(users);
  //return getAllUsers(res);
  
 });

var getAllUsers = function (res) {
  con.query('SELECT * FROM GCP.Users;', function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    res.json(result);
  });
}
app.post("/addUser",  (req, res) => {
  console.log(req.body)
  var obj = {}
  obj.id = users[users.length - 1].id + 1;
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
    if (err) throw err;
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