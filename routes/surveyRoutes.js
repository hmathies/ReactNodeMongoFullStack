const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
//we can use the mongoose model class instance of a Survey
const Survey = mongoose.model("surveys");

module.exports = app => {
  //use 4242 4242 4242 4242 as the card number
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });
  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({email, url}) => {
      const pathname = new URL(url).pathname;
      const path = new Path('/api/surveys/:surveyId/:choice');
      const match = path.test(pathname);
      if (match) {
        return {email, surveyId: match.surveyId, choice: match.choice};
      }
    });
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    console.log(uniqueEvents)
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      //below we are spliting the email strings, and then mapping over them to create key value pairs of email: user@email
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    //code where we send an email
    //we expect the below surveyTemplate to be called with the survey model
    const mailer = new Mailer(survey, surveyTemplate(survey));
    //before we save any surveys, we want to make sure the code inside mailer.send (which is in Mailer.js) is completed
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      //we are sending the new user model back to update the user credits on the front end
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
