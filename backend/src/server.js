const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt")

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  password: "",
  database: "Smart_inventory_task_management_db",
  host: "localhost",
});

db.connect((e) => {
  if (e) throw e;
  console.log("DB connected 🌻");
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "I Love my MAMA 🌼👻" });
});

// ----------------- users  ---------------------------


app.post("/api/users" , (req , res) => {
    const {name , email, password , role } = req.body

    if (!name || !email|| !password || !role) {
        return res.status(400).json({message : "name , email, password , role, are required"})
    }

    if (role !== "Admin" && role !== "Manager" && role !== "Staff") {
        return res.status(400).json({message : "role is not supported choose : Admin, Manager and Staff"})
    }

    db.query("SELECT * FROM users WHERE email = ?", [email] , (getErr , getRes) => {
        if (getErr) {return res.status(500).json({message : "Get email error", error : getErr.message})}

        if (getRes.length !== 0) {return res.status(400).json({message : "Email is ready exits "})}

        bcrypt.hash(password , 10, (hashErr , hashRes) => {
            if (hashErr){ return res.status(500).json({message : "hash error", error : hashErr.message})}
            
            db.query("INSERT INTO users (name , email, password , role) VALUES (?, ?, ?, ?)", [name , email, hashRes , role ], (insertErr, insertRes) => {
                if (insertErr) {return res.status(500).json({message : "Insert error", error : insertErr.message})}

                return res.status(201).json({message : "User created 🌻", id : insertRes.insertId})
            })
        })
        
    })
});

app.listen(3011, () => console.log("Server is run on port 3011"));
