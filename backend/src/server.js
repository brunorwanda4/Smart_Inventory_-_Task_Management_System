const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Register application 🌼" });
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Register_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database is connected successful 🌻");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username , password are required " });

  db.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (getErr, getRes) => {
      if (getErr) {
        return res.status(500).json({
          message: "some thing went wrong to get user",
          error: getErr.message,
        });
      }

      if (getRes.length !== 0) {
        return res.status(400).json({ message: "username is ready exists" });
      }

      bcrypt.hash(password, 10, (hashErr, hashRes) => {
        if (hashErr)
          return res.status(500).json({
            message: "some thing went wrong to hash password",
            error: hashErr.message,
          });

        db.query(
          "INSERT INTO Users (username , password) VALUES (? , ?)",
          [username, hashRes],
          (insertErr, insertRes) => {
            if (insertErr)
              return res.status(500).json({
                message: "some thing went wrong",
                error: insertErr.message,
              });

            return res.status(201).json({
              message: "User created successful",
              id: insertRes.insertId,
            });
          }
        );
      });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "username ,password are require" });

  db.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (getErr, getRes) => {
      if (getErr) {
        return res.status(500).json({
          message: "some thing went wrong to get user",
          error: getErr.message,
        });
      }

      if (getRes.length === 0) {
        return res.status(404).json({ message: "Username is not exist" });
      }

      const user = getRes[0];
      bcrypt.compare(password, user.password, (comErr, copRes) => {
        if (comErr) {
          return res
            .status(500)
            .json({ message: "Compare password", error: comErr.message });
        }

        if (copRes) {
          const token = jwt.sign(
            {
              username: user.username,
            },
            "I Love my MAMA",
            { expiresIn: "2day" }
          );

          delete user.password

          return res.status(200).json({ message: "Login successful 🌻", token, user });
        } else {
          return res.status(400).json({message : "Password are not match"})
        }

      });
    }
  );
});

app.listen(3010, () => console.log("Application is running 👻 on port 3010"));
