const app = require('../../src/app');

describe('\'campaigns\' service', () => {
  it('registered the service', () => {
    const service = app.service('campaigns');
    expect(service).toBeTruthy();
  });
});
