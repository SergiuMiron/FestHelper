// Initializes the `wishlist` service on path `/wishlist`
const createService = require('feathers-mongoose');
const createModel = require('../../models/wishlist.model');
const hooks = require('./wishlist.hooks');
const filters = require('./wishlist.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'wishlist',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wishlist', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wishlist');

  app.service('wishlist').find({
    query: {
      username: new URLSearchParams(this.username)
    }
  })
    

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
