const passport = require("passport");

module.exports = app => {
  //below is when the user first attempts to login and this url gets sent to google oauth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //below is what google  oauth sends back to the server after a user has attempted to login
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
  //the request sent to route handler, extracts cookie data, pulls user id out of cookie data, turns user
  //id into a user, User model instance added to req object as 'req.user'
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
