const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("./BD.js");
const { sha256 } = require("./Utils.js");


// Auth Client
router.post("/client", (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT name, username , status FROM commerce.client WHERE (username='${username}' AND password= '${sha256(password)}')`
    connection.query(sql, (error, results) => {
        if (error) res.send(error);
        if (results.length !== 0) {
            jwt.sign({ user: username }, "UltraSecretKey", { expiresIn: '30h' }, (err, token) => {
                res.status(200).json({
                    token: token,
                    status: true,
                    typeUser: "Client",
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

// Creates new client
router.post("/newClient", (req, res) => {
    const sql = "INSERT INTO commerce.client SET ?"
    const newClient = buildNewClient(req.body);
    connection.query(sql, newClient, error => {
        if (error) throw error
        res.status(200).send("Client register successfully");
    })
});

/**
 * @method buildNewClient
 * @description Builds and returns a new client as an object
 * @param {array} 
 * @returns {}
 */
const buildNewClient = (data) => {
    return {
        name: data.name,
        username: data.username,
        password: sha256(data.password),
        status: "active"
    }
}


module.exports = router;