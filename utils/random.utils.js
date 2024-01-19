const crypto = require("crypto");
const randomString = require("randomstring");

exports.randomName = () => {
  return randomString.generate(8);
};

exports.randomPrice = () => {
  return crypto.randomInt(1000, 2000);
};

exports.randomQuantity = () => {
  return crypto.randomInt(10, 20);
};

exports.randomImage = () => {
  return "https://i.ibb.co/jZgGpxX/momo-blog-500x500.jpg";
};

exports.randomRating = () => {
  return crypto.randomInt(3, 5);
};

exports.randomVeg = () => {
  return [0, 1][crypto.randomInt(0, 2)];
};

exports.randomNumOfRating = () => {
  return crypto.randomInt(100, 5000);
};

exports.randomDescription = () => {
  return randomString.generate(50);
};

exports.randomHealthy = () => {
  return [0, 1][crypto.randomInt(0, 2)];
};
