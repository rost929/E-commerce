const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("./BD.js");
const { sha256 } = require("./Utils.js");


// Verifies if token exists and if it is active 
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof(bearerHeader) !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403).send("Access denied")
    }
}

// Creates a new employee
router.post("/newAdmin", (req, res) => {
    const sql = "INSERT INTO commerce.admin SET ?"
    const newAdmin = { username: req.body.username, password: sha256(req.body.password), status: "active" };
    connection.query(sql, newAdmin, error => {
        if (error) {
            res.status(400).send("Could not add new Admin")
            throw error;
        } else {
            res.status(200).send("Admin created successfully");
        }
    });
});

// Creates a new employee
router.post("/newEmployee", verifyToken, (req, res) => {
    jwt.verify(req.token, "UltraSecretKey", (error) => {
        if (error) {
            res.sendStatus(403).send("Invalid Token");
        } else {
            const sql = "INSERT INTO commerce.employee SET ?"
            const newEmpl = buildNewEmployee(req.body);
            connection.query(sql, newEmpl, error => {
                if (error) {
                    res.status(400).send("Could not add new employee")
                    throw error;
                } else {
                    res.status(200).send("Employee created successfully");
                }
            });
        }
    });
});

//updates status employee
router.put("/statusEmployee", verifyToken, (req, res) => {
    const { username, status } = req.body
    jwt.verify(req.token, "UltraSecretKey", (error) => {
        if (error) {
            res.sendStatus(403).send("Invalid Token");
        } else {
            const sql = `UPDATE commerce.employee SET status = '${status}' WHERE ( username = '${username}');`;
            connection.query(sql, error => {
                if (error) {
                    res.status(400).send("Status invalid");
                    throw error;
                } else {
                    res.status(200).send(`Employee ${username} status change to ${status} successfully`);
                }

            })
        }
    });
});

// Auth Admin
router.post("/admin", (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT username , status FROM commerce.admin WHERE (username='${username}' AND password= '${sha256(password)}')`;
    connection.query(sql, (error, results) => {
        console.log(results);
        if (error) res.send(error);
        if (results.length !== 0) {
            jwt.sign({ user: username }, "UltraSecretKey", { expiresIn: '30h' }, (err, token) => {
                res.status(200).json({
                    token: token,
                    status: true,
                    typeUser: "Admin",
                    user: JSON.parse(JSON.stringify(results))
                })
            });
        } else {
            res.status(403).json({
                status: false
            });
        }
    });
});

/**
 * @method buildNewEmployee
 * @description Builds and returns a new employee as an object
 * @param {} 
 * @returns {}
 */
const buildNewEmployee = (data) => {
    return {
        name: data.name,
        username: data.username,
        password: sha256(data.password),
        status: "active"
    }
}

module.exports = router;