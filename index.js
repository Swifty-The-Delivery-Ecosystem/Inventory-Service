const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();
const port = process.env.PORT;

app.listen(port,()=>{
  console.log('listening on port '+process.env.PORT);
});

app.use(express.json());


app.use("/api/customer",require('./routes/customerRoutes'));
// app.use("/api/vendor",require('./routes/vendorRoutes'));
