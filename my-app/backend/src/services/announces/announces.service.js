// Initializes the `announces` service on path `/announces`
const createService = require('feathers-mongoose');
const createModel = require('../../models/announces.model');
const hooks = require('./announces.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/announces', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('announces');

  service.hooks(hooks);
};
