const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
//const PORT = process.env.PORT || 3306
app.use(bodyparser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "commercedb"
});

connection.connect(error => {
    if (error) throw error;
    console.log("database running");
});

app.listen(8080, () => console.log("Server running"));


app.post("/api/v1/newEmployee", (req, res) => {
    //const sql = `INSERT INTO commerce.employee (name, username, password, state) VALUES (${req.body.name}, ${req.body.username}, SHA(${req.body.password}),'active');`;
    const sql = "INSERT INTO commerce.employee SET ?"
    const newEmployee = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        state: "active"
    }
    connection.query(sql, newEmployee, error => {
        if (error) throw error
        res.status(200).send("Employee created");
    })
});

app.post("/api/v1/newClient", (req, res) => {
    //const sql = `INSERT INTO commerce.employee (name, username, password, state) VALUES (${req.body.name}, ${req.body.username}, SHA(${req.body.password}),'active');`;
    const sql = "INSERT INTO commerce.client SET ?"
    const newClient = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        state: "active"
    }
    connection.query(sql, newClient, error => {
        if (error) throw error
        res.status(200).send("Client register successfully");
    })
})