const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//express middleware which is wired up using app.use
const bodyParser = require("body-parser");
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
//midddleware
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//below essentially turns the files into a function and immediately calls our express app
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// when deployed to production, the create-react-app server doesn't exists and the express
// server handles all of the routing so we need to tell it what to do with the react routes and files
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like our main.js or main.css files
  app.use(express.static("client/build"));

  // Express will serve up the index.html if it doesn't recognize the route from any other
  //route handlers including the one directly above in this if statement
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resole(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
