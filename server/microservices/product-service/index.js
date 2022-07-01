const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
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
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

// route to get all products
app.get("/product", async (req, res) => {
    let products;
    try {
      products = await Product.find();
    } catch (error) {
      console.log(err);
    }
  
    if (!products) {
      return res.status(404).json({ message: "No devices found" });
    }
    // console.log("products - ",products)
    return res.status(200).json({ products });
  });

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
app.post("/product/reserve", async (req, res) => {
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
    console.log("Consuming data from PRODUCT - ", reservation);
  });
  return res.json(order);
});

// route to create a product
app.post("/product/create", async (req, res) => {
  const { itemName, price, totalQuantity } = req.body;
  const newProduct = new Product({
    itemName,
    price,
    totalQuantity,
  });
  newProduct.save();
  return res.json(newProduct);
});



//  route to get product by id
app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findById(id);
  } catch (error) {
    console.log(err);
  }

  if (!product) {
    return res.status(404).json({ message: "No devices found" });
  }
  return res.status(200).json({ product });
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
