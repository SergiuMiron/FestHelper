const campaigns = require('./campaigns/campaigns.service.js');
const questions = require('./questions/questions.service.js');
const settings = require('./settings/settings.service.js');
const tests = require('./tests/tests.service.js');
const locations = require('./locations/locations.service.js')
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(campaigns);
  app.configure(questions);
  app.configure(settings);
  app.configure(tests);
  app.configure(locations);
  app.configure(users);
};
