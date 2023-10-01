const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

// APP
const app = require("./app");

// Database Connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`DB Connected Successfully`.magenta.bold);
});

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running at ${port}`.yellow.bold);
});
