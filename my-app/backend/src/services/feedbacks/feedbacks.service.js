// Initializes the `feedbacks` service on path `/feedbacks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/feedbacks.model');
const hooks = require('./feedbacks.hooks');
const filters = require('./feedbacks.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'feedbacks',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/feedbacks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('feedbacks');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
