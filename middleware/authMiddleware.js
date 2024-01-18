const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/vendor.model");

const extractTokenMiddleware = asyncHandler(async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    res.status(401);
    throw new Error("Unauthorized: Token missing");
  }

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("Unauthorized: Invalid token");
    }

    const vendor_id = decoded.id;

    // Attach the vendor_id to the request for future use in your route handlers
    req.vendor_id = vendor_id;

    console.log("hello",vendor_id);

    // Continue to the next middleware or route handler
    next();
  });
});

module.exports = extractTokenMiddleware;
