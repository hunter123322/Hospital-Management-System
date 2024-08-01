const session = require("express-session");
const MongoStore = require("connect-mongo");

const dbConnect = require("../model/databaseConnection");
const url = require("../config/databaseURL");

dbConnect();

const sessionMiddleware = session({
  secret: "Mykey", // Replace with a strong secret key for session encryption
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: url }), // Use MongoStore.create() with mongoUrl option
  cookie: {
    maxAge: 3600000, // Example: Session expires after 1 hour (in milliseconds)
    secure: false, // Set to true if using HTTPS
    httpOnly: true, // Cookie accessible only through HTTP(S) protocol, not JavaScript
  },
});

module.exports = sessionMiddleware;

/**
 * 
 *
 * HTTPS
 *
 *
 */

// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const dbConnect = require("../model/databaseConnection");
// const url = require("../model/databaseURL.js");

// dbConnect();

// const sessionMiddleware = session({
//   secret: "Mykey", // Replace with a strong secret key for session encryption
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: url }), // Use MongoStore.create() with mongoUrl option
//   cookie: {
//     maxAge: 3600000, // Example: Session expires after 1 hour (in milliseconds)
//     secure: process.env.NODE_ENV === 'production', // Set to true in production
//     httpOnly: true, // Cookie accessible only through HTTP(S) protocol, not JavaScript
//   },
// });

// module.exports = sessionMiddleware;
