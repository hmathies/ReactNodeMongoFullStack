const keys = require("../config/keys");
//check out stripe documentation which tells you to pass the strip secret key to the require
const stripe = require("stripe")(keys.stripeSecretKey);
//when you make post requests to an express server, express does not by default parse the request
//payload.  we have to install another module that will take the request body, parse it, and make it available
//inside our application. All of the token information will be made available under the req.body
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  //to specify that we want the below handler to run the middleware before it goes to the request handler logic we pass it (requireLogin) as a second argument to the route handler
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    req.user.credits += 5;
    //whenever we save a model it is an asynchronous request and takes time
    const user = await req.user.save();

    res.send(user);
  });
};
