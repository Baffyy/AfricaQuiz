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

var countries= [];
let score= 0;

db.query("SELECT * FROM african_capitals", (err,res) => {
    if (err) {
        console.err("Cannot display query",err.stack)
    } else{
        countries = res.rows
    };
});


app.get("/", (req,res) => {
    const foundCountry=  afrique();
    res.render("index.ejs", {country: foundCountry,
        totalScore: score
    })
})

app.post("/submit", async (req, res) => {
    const userAnswer = req.body.name.trim();
    const realId = req.body.id;

    console.log(realId);

    const correctCountry= countries.find((capital) => capital.id == realId)

    console.log(correctCountry);
    
    if (correctCountry && userAnswer.toLowerCase() == correctCountry.capital.toLowerCase() ) {
        score++;
    } else {
        score = 0
    }
    
    res.redirect("/")
});

function afrique () {
    const africanCountry = Math.floor(Math.random() * countries.length);
    const foundCountry = countries[africanCountry]; 
    return foundCountry;
};



app.listen(port, () => {
    console.log("server is running on port 3000");
});