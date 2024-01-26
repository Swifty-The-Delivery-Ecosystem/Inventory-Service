const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
const port = 4005;

if (process.env.NODE_ENV != "test") {
  app.listen(port, () => {
    console.log("listening on port " + 4005);
  });
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.use("/api/v1/inventory/customer", require("./routes/customerRoutes"));
app.use("/api/v1/inventory/vendor", require("./routes/vendorRoutes"));

module.exports = app;
