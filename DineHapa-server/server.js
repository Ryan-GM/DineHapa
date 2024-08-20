const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

const port = 3000;
const host = "localhost";

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});