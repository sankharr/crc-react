const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 8080;
const path = require("path");
const Product = require("./Product");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const isAuthenticated = require("../../isAuthenticated");
var order;

var channel, connection;

const app = express();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

// function to create the Product queue
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PRODUCT");
}
// creating the product queue
connect().catch((err) => console.log("error from amqp Connect - ", err));

// route to reserve a product
app.post("/product/reserve", isAuthenticated, async (req, res) => {
  const {
    itemName,
    startDate,
    endDate,
    days,
    amount,
    quantity,
    customerName,
    eventColor,
    status,
  } = req.body;
  //   const products = await Product.find({ _id: { $in: ids } });
  channel.sendToQueue(
    "RESERVATION",
    Buffer.from(
      JSON.stringify({
        itemName,
        startDate,
        endDate,
        days,
        amount,
        quantity,
        customerName,
        eventColor,
        status,
      })
    )
  );
  channel.consume("PRODUCT", (data) => {
    reservation = JSON.parse(data.content);
    console.log("Consuming data from PRODUCT - ",reservation)
  });
  return res.json(order);
});

// route to create a product
app.post("/product/create", isAuthenticated, async (req, res) => {
  const { itemName, price, totalQuantity } = req.body;
  const newProduct = new Product({
    itemName,
    price,
    totalQuantity,
  });
  newProduct.save();
  return res.json(newProduct);
});

// connecting to MongoDB
mongoose.connect(
  process.env.CONNECTION_URL_PRODUCT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Product-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
