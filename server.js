const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
// const jwt = require("./auth/jwt");
// const config = require("./config/db");
const morgan = require("morgan");
require("dotenv").config();
require("./services/wakeUpService");
const errorHandler = require("./services/error-handler");
const { authMiddleware } = require("./middleware/authMiddleware");

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to the database.");
});

db.on("error", err => {
  console.log(`Database error: ${err}`);
});

// Instantiate express
const app = express();

// Don't touch this if you don't know it
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
app.enable("trust proxy");

// Set public folder using built-in express.static middleware
app.use(express.static("public"));

// Set body parser middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Enable cross-origin access through the CORS middleware
// NOTICE: For React development server only!
if (process.env.CORS) {
  app.use(cors());
}

// Initialize routes middleware
// Uncomment this after user creation
// app.use(jwt());
app.use("/api/users", require("./routes/users"));
// app.use("/api/messages", authMiddleware, require("./routes/messages"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/records", authMiddleware, require("./routes/records"));

// return build react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// global error handler
app.use(errorHandler);

// Use express's default error handling middleware
// app.use((err, req, res, next) => {
//   if (res.headersSent) return next(err);
//   res.status(400).json({ err: err });
// });

// Start the server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Set up socket.io
const io = socket(server);
let online = 0;

io.on("connection", socket => {
  online++;
  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  // io.emit("visitor enters", online);

  // socket.on("add", data => socket.broadcast.emit("add", data));
  // socket.on("update", data => socket.broadcast.emit("update", data));
  // socket.on("delete", data => socket.broadcast.emit("delete", data));

  socket.on("disconnect", () => {
    online--;
    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit("visitor exits", online);
  });
});
