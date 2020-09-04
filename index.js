const express = require("express")
const morgan = require("morgan");
const bodyParser = require("body-parser");

var mysql = require("mysql")

const app=express();
const port=process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('./public/'));

app.use(morgan("dev")); // log every request to the console

app.use(bodyParser.urlencoded({"extended":"true"})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
 
app.listen(port,()=>{
    console.log(`magic happening at post ${port}`)
})


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newdb'
  });

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});



app.get('/',(req,res)=>{
    res.sendFile("./index.html")
})


app.post("/sendData",(req,res)=>{

    var data={
        data:req.body.data
    };

    let sql = "INSERT INTO todolist SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
     
    });
  
     res.redirect('/')
})

app.get("/retrive",(req,res)=>{

    let sql = "select * from todolist";
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
     res.json(results)
    });
})