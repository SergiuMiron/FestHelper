// tests-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tests = new Schema({
    title: { type: String, required: true, minLength: 1, maxLength: 120 },
    campaignName: { type: String, required: true, minLength: 1, maxLength: 120 },
    numQuestions: { type: Number, required: true, min: 1, max: 99 },
    difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"] },
    disciplines: { type: Array, required: true, min: 1, max: 9 },
    questions: { type: Array },
    status: { type: String, enum: ['available', 'started', 'submitted'] },
    points: { type: Number },
    maxPoints: { type: Number }
  }, {
    timestamps: true
  });

  return mongooseClient.model('tests', tests);
};
