// questions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.


module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const questions = new Schema({
    title: { type: String, required: true, unique: true, index: true, minLength: 1, maxLength: 1000 },
    type: { type: String, required: true, enum: ["choice", "logic", "code"] },
    discipline: { type: String, required: true, enum: ["java", "dotnet", "ui", "am", "testing", "android", "ios"] },
    difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"] },
    choices: [String],
    answer: [String],
    points: { type: Number, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('questions', questions);
};
