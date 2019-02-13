//middleware is a function that takes the incoming request and has the ability to modify it
//inside of the middleware body
//the next middleware is kind of like the done .  When the next middleware is called, it goes to the next
// middleware in the chain. ** You only call next() if you want to go on to the next middleware(or if even there is one)
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in" });
  }
  //we call next here because that means the user is logged in. We don't want to call next inside the if statement because
  // we want to send the error and not go on and potentially crash our server
  next();
};
