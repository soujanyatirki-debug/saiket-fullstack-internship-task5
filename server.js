const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"root123",
database:"userdb"
});
db.connect((err)=>{
if(err){
console.log("Database connection failed");
}else{
console.log("Connected to MySQL");
}
});
app.get("/users",(req,res)=>{
db.query("SELECT * FROM users",(err,result)=>{
if(err) throw err;
res.json(result);
});
});
app.post("/users",(req,res)=>{
const {name,email,age}=req.body;
db.query(
"INSERT INTO users(name,email,age) VALUES(?,?,?)",
[name,email,age],
(err,result)=>{
if(err) throw err;
res.send("User Added");
});
});
app.listen(5000,()=>{
console.log("Server running on port 5000");
});