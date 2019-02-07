const app = require('../../src/app');

describe('\'announces\' service', () => {
  it('registered the service', () => {
    const service = app.service('announces');
    expect(service).toBeTruthy();
  });
});
