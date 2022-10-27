import express from "express";
const authRoute = require ("./routes/auth.route")
const houseRoute = require ("./routes/house.route")
import bodyParser from "body-parser";
var cookieParser = require('cookie-parser')
var cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoute)
app.use("/api/house", houseRoute)


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
