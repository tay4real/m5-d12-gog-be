const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");

const gamesRouter = require("./services/games");
const cartRouter = require("./services/cart");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./errorHandling");

const server = express();

const port = process.env.PORT || 3001;

server.use(express.json());

const whiteList =
  process.env.NODE_ENV === "production"
    ? [process.env.FE_URL_PROD]
    : [process.env.FE_URL_DEV];

// const whiteList = [process.env.FE_URL_PROD, process.env.FE_URL_DEV];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      // allowed
      callback(null, true);
    } else {
      // Not allowed
      callback(new Error("NOT ALLOWED - CORS ISSUES"));
    }
  },
};

server.use(cors(corsOptions)); // CROSS ORIGIN RESOURCE SHARING

server.get("/", (req, res, next) => res.send("Server is running..."));
server.use("/games", gamesRouter);
server.use("/cart", cartRouter);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

console.log(listEndpoints(server));

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Server is running on cloud on port", port);
  } else {
    console.log("Server is running locally on port", port);
  }
});
