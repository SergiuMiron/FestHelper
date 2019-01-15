// Initializes the `questions` service on path `/questions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/locations.model');
const hooks = require('./locations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/locations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('locations');

  app.service('locations').find({
    query: {
      $select: [ 'name','city','price','phone','startLocation','endLocation']
    }
  });

  service.hooks(hooks);
};
