require('dotenv').config();
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

// Packages
const express = require("express");
const mysql = require('mysql');
const fetch = require("node-fetch");

// Misc 
const app = express();
const pool = dbConnection();

// EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// POST
app.use(express.urlencoded({extended:true}));

// DATA IN JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("welcome");
});

app.get('/users', async (req, res) => {
    let sql = "SELECT * FROM users";
    let rows = await executeSQL(sql);
    res.json(rows);
});

function dbConnection() {
    const pool  = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
    });

    return pool;
}

app.listen(3000, () => {
    console.log('server started');
});

async function executeSQL(sql, params) {
  return new Promise (function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
    if (err) throw err;
      resolve(rows);
    });
  });
}