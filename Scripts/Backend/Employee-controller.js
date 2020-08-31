const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("./BD.js");
const { sha256 } = require("./Utils.js");


//Format of token
// Authorization: Bearer <access_token>


//Verifies if token exists and if it is active
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

// Creates new product 
router.post("/newProduct", verifyToken, (req, res) => {
    jwt.verify(req.token, "UltraSecretKey", (error) => {
        if (error) {
            res.sendStatus(403).send("Invalid Token");
        } else {
            const sql = "INSERT INTO commerce.product SET ?"
            const newProduct = buildNewProduct(req.body);
            connection.query(sql, newProduct, error => {
                if (error) throw error;
                res.status(200).send("Product register successfully");
            });
        }
    })
});

// Deletes product by name
router.delete("/deleteProduct/:name", verifyToken, (req, res) => {
    const { name } = req.params;
    jwt.verify(req.token, "UltraSecretKey", (error) => {
        if (error) {
            res.sendStatus(403).send("Invalid Token");
        } else {
            const sql = `DELETE FROM  commerce.product WHERE name = '${name}'`;
            connection.query(sql, (error, results) => {
                console.log(results);
                if (error) throw error;
                if (results.affectedRows > 0) {
                    res.json({
                        message: "Product deleted"
                    });
                } else {
                    res.status(400).json({ message: "Product not found" })
                }
            });
        }
    });
});

//find a product by name  
router.get("/product/:name", verifyToken, (req, res) => {
    const { name } = req.params
    jwt.verify(req.token, "UltraSecretKey", (error) => {
        if (error) {
            res.sendStatus(403).send("Invalid Token");
        } else {
            const sql = `SELECT * FROM commerce.product WHERE name= '${name}'`
            connection.query(sql, (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    res.json({
                        results,
                        message: "Product found"
                    });
                } else {
                    res.status(400).json({ message: "Product not found" })
                }
            });
        }
    });
});

// Get all products
router.get("/products", verifyToken, (req, res) => {
    jwt.verify(req.token, "UltraSecretKey", (error) => {
        if (error) {
            res.sendStatus(403).send("Invalid Token");
        } else {
            const sql = "SELECT * FROM commerce.product"
            connection.query(sql, (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    res.json({
                        results,
                        message: "Products found"
                    });
                } else {
                    res.status(400).json({ message: "Any product found" })
                }
            });
        }
    });
});


// auth employee
router.post("/employee", (req, res) => {
    const { username, password } = req.body
    const sql = `select name, username , status from commerce.employee where (username='${username}' and password='${sha256(password)}')`
    connection.query(sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        if (results.length !== 0) {
            jwt.sign({ user: username }, "UltraSecretKey", { expiresIn: '30h' }, (err, token) => {
                res.status(200).json({
                    token: token,
                    status: true,
                    typeUser: "Employee",
                    user: JSON.parse(JSON.stringify(results))
                })
            });
        } else {
            res.status(403).json({
                status: false
            });
        }
    })
});

/**
 * @method buildNewProduct
 * @description Builds and returns a new product as an object
 * @param {array} 
 * @returns {}
 */
const buildNewProduct = (data) => {
    return {
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        taxRate: data.taxRate,
        productStatus: data.productStatus,
        inventoryQuantity: data.inventoryQuantity
    }
}

module.exports = router;