import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const db = new pg.Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "baffourgyimah",
    password: "1234567",
    port: 5432
});

db.connect();

var countries= {};
var score= 0

db.query("SELECT country FROM african_capitals", (err,res) => {
    if (err) {
        console.err("Cannot display query",err.stack)
    } else{
        countries = res.rows
    };
});

app.get("/", (req,res) => {
    const africanCountry = Math.floor(Math.random() * countries.length);
    const foundCountry = countries[africanCountry]; 
    res.render("index.ejs", {country: foundCountry,
        totalScore: score
    })
})



app.listen(port, () => {
    console.log("server is running on port 3000");
});