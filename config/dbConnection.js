const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
      const connect = await mongoose.connect(process.env.NODE_ENV == 'test' ? process.env.TEST_CONNECTION_STRING : process.env.CONNECTION_STRING);
      console.log('Connected to database', connect.connection.host, connect.connection.name);

    }
    catch(err){
      console.error(err);
      process.exit(1);
    }
};

module.exports = connectDb;