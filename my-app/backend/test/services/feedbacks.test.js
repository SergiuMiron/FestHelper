const assert = require('assert');
const app = require('../../src/app');

describe('\'feedbacks\' service', () => {
  it('registered the service', () => {
    const service = app.service('feedbacks');

    assert.ok(service, 'Registered the service');
  });
});
