var express = require("express");
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
app.get("/users", (req, res, next) => {
    res.json(users);
   });
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
    res.json(users);
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});