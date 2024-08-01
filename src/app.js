console.clear();

const PORT = process.env.PORT || 3000;

const router = require("./routes/routes");
// const cookie = require("./controllers/cookieController.js");
const errorController = require("./controller/errorController.js");

const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(morgan("combined"));
app.use(xss());
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/", router);

app.use(errorController.respondNoResourcesFound);
app.use(errorController.respondInternalError);

app.listen(PORT, () => {
  console.log(`The server running on port: ${PORT}`);
});
