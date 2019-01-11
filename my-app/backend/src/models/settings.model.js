// settings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const settings = new Schema({
    linkAvailability: { type: Number, required: true, min: 1, max: 240 },
    testDuration: { type: Number, required: true, min: 5, max: 120 },
    instructions: { type: String, required: true, minLength: 1, maxLength: 4000 },
    summary: { type: String, required: true, minLength: 1, maxLength: 4000 },
    emailTemplateSubject: { type: String, required: true, minLength: 1, maxLength: 120 },
    emailTemplateBody: { type: String, required: true, minLength: 1, maxLength: 4000 }
  }, {
    timestamps: true
  });

  return mongooseClient.model('settings', settings);
};
