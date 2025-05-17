const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  password: "",
  database: "",
  host: "localhost",
});

db.connect((e) => {
  if (e) throw e;
  console.log("DB connected 🌻");
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "I Love my MAMA 🌼👻",
  });
});

app.listen(3011, () => console.log("Server is run on port 3011"));
