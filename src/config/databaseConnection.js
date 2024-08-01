const mongoose = require("mongoose");

//Your actual URL for mongoDB
const url = require("./databaseURL.js");

const connectToDatabase = async () => {
  mongoose.connect(url);

  //This line of code will catch the error if it's connection failed
  mongoose.connection.on("error", (err) => {
    console.error(`Connection error at ${err}`);
  });

  // This code will apear to connection seccessfull
  mongoose.connection.once("open", () => {
    console.log("MongoDB connection opened!");
  });
};

module.exports = connectToDatabase;
