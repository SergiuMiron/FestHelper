const app = require('../../src/app');

describe('\'quizes\' service', () => {
  it('registered the service', () => {
    const service = app.service('quizes');
    expect(service).toBeTruthy();
  });
});
