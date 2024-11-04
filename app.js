const express = require("express");
const mainRouter = require('./router/mianRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(mainRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`your server is running on port : ${port}`);
});

