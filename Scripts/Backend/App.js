const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const clientEndpoints = require("./Client-controller.js");
const employeeEndpoints = require("./Employee-controller.js");
const adminEndpoints = require("./Admin-controller.js");

//Middlewares
app.use(bodyparser.json());
app.use(cors());
app.use("/api/v1", clientEndpoints);
app.use("/api/v1", employeeEndpoints);
app.use("/api/v1", adminEndpoints);

//Server 
app.listen(8080, () => console.log("Server running"));