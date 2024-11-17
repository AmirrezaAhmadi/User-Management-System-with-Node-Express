const express = require("express");
const userRoutes = require("./router/userRouter");
const adminRoutes = require("./router/adminRouter");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoutes);
app.use('/admin' , adminRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`your server is running on port : ${port}`);
});
