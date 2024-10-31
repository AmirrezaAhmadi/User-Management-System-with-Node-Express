const express = require("express");
const mainRouter = require('./router/mianRouter');

require("dotenv").config();
const app = express();

app.use(mainRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`your server is running on port : ${port}`);
});

