module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits" });
  }
  //we call next here because that means the user is has enough credits. We don't want to call next inside the if statement because
  // we want to send the error and not go on and potentially crash our server
  next();
};
