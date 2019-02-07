// prod.js - production keys here
//these environmental variables are set up on heroku
// the google credentials are from the google+ API using the OAuth client ID

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
