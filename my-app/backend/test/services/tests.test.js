const app = require('../../src/app');

describe('\'tests\' service', () => {
  it('registered the service', () => {
    const service = app.service('tests');
    expect(service).toBeTruthy();
  });
});
