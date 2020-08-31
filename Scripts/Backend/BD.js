const mysql = require("mysql");

/**
 * @method connection
 * @description Creates a connection to the database
 * @param {array} 
 * @returns {}
 */
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


module.exports = connection;