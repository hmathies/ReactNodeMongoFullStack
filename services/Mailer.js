// the file is a capitol because it is exporting a class whereas the passport.js file is not exporting anything
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

// the helper.Mail property is an object that takes a lot of configuration and spits out a mail
//we want to take the helper.Mail property and add on to it to customize it. So we are extending what is already
//inside of the sendgrid.mail library
class Mailer extends helper.Mail {
  // the constructor function will be called automatically in es6 classes
  // the content below will be an html string which we get from our surveyTemplate(survey) from surveyRoutes.js
  // we are destructoring subject and recipients but not content
  constructor({ subject, recipients }, content) {
    super();
    // below returns a sendgrid object which we can use to communicate with the sendgrid API
    this.sgApi = sendgrid(keys.sendGridKey);
    //sendgrid specific-- the helper.Email and helper.Content are two helper functions from the sendgrid library
    //they work to format the from_email and body to work correctly inside of an actual email
    this.from_email = new helper.Email("no-reply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);
    //addContent is a build in Mail function from sendgrid Mail class
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    // you can't have destructuring without the parenthesis
    // the es6 syntac ({email}) means email: email
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  //function to format the email list and register it
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // the below line adds all of the recipient formatted emails and adds them to the personalize object which is passed in to the addPersonalization method from sendgrid
    this.addPersonalization(personalize);
  }

  async send() {
    //toJSON and API are both functions provided by sendgrid API
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
