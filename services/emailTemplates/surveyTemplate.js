// define and export a function which will return the html for the body of any email sent out
//we pass in the survey model and then access the body property
//// TODO: look into html email markup on the web
// in the user inbox we can't rely on relative links so we use links from the keys file
const keys = require("../../config/keys");
module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center";>
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          </div>
          <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
        </div>
      </body>
    </html>

  `;
};
