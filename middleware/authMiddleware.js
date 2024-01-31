const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/vendor.model");

const extractTokenMiddleware = asyncHandler(async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    res.status(401);
    throw new Error("Unauthorized: Token missing");
  }

  const token = tokenHeader.split(" ")[1];
  
  await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    console.log(decoded);    
if (err) {
      res.status(401);
      throw new Error("Unauthorized: Invalid token");
    }
   
    const vendor_id = decoded.userId;
    console.log(vendor_id);
    req.vendor_id = vendor_id;
    next();
  });
});

module.exports = extractTokenMiddleware;
