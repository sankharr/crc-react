const express = require('express');
const mongoose = require('mongoose');
// const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 7070;
const path = require('path');
const User = require("./User.js");
const jwt = require("jsonwebtoken");
// const env = require("../../.env")

const app = express();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Middlewares

//This will convert to json
app.use(express.json());
// app.use(cors());

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else {
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
});

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: "User already exists" });
    } else {
        const newUser = new User({
            email,
            name,
            password,
        });
        newUser.save();
        return res.json(newUser);
    }
});

mongoose
  .connect(
    process.env.CONNECTION_URL_AUTH,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`Auth-Service DB Connected`);
    }
);

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});