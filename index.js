const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.listen(port,()=>{
  console.log('listening on port '+process.env.PORT);
});
