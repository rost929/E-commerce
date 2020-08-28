const app = require("./App.js");

app.get("/employees", (req, res) => {
    const sql = "select name, username from commerce.employee"
    connection.query(sql, (error, results) => {
            if (error) throw error;
            res.json(results);
        })
        //res.send("Funciono y aqui estoy ");
});

app.get("/employees/:id", (req, res) => {
    const { id } = req.params
    const sql = `select name, username from commerce.employee where id= ${id}`
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    })
});



app.put("/updateEmployee/:username", (req, res) => {
    const { username } = req.params
    const { password } = req.body
    const sql = `UPDATE commerce.employee SET password = SHA('${password}') WHERE ( username = '${username}');`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send("Password modified successfully");
    })
});

app.delete("/removeEmployee/:username", (req, res) => {
    const { username } = req.params;
    const sql = `DELETE FROM  commerce.employee where username = '${username}'`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send("Employee deleted successfully ")
    })
})