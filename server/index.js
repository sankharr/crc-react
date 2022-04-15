const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/reservation-routes");
const cors = require("cors");
const dotenv = require("dotenv");
// const bodyParser = require('body-parser');
const app = express();
dotenv.config();
// Middlewares

//This will convert to json
app.use(express.json());
app.use(cors());
app.use("/reservations", router); // localhost:5000/reservations

mongoose
  .connect(
    process.env.CONNECTION_URL
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));