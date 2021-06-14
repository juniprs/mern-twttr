const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const passport = require("passport");
require("./config/passport")(passport);

const path = require("path");


mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

// app.get("/", (req, res) => {
//     debugger;
//     res.send("Hello World!");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.use(passport.initialize());

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log (`Listening on port ${port}`)});