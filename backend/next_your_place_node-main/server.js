require("rootpath")();
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http").Server(app);
const bodyParser = require("body-parser");
//
// const jwt = require('./_helpers/jwt')
const config = require("./config.json");
const errorHandler = require("./_helpers/error-handler");

// const socket = require("./socket");
// socket.start(http);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use((req, res, next) => {
  const headers = req.headers;
  if (headers.authorization) {
    const authHeader = headers.authorization;
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid Authorization header" });
    }
  }
  next();
});

// api routes
app.use("/util", require("./util/util.controller"));
app.use("/user", require("./user/user.controller"));
app.use("/property", require("./property/property.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || config.PORT;

http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
