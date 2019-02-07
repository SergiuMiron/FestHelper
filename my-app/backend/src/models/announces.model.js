// announces-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const announces = new Schema({
    phone: { type: Number, minLength: 1, maxLength: 120 },
    description: { type: String },
    username: { type: String },
    festival: { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('announces', announces);
};
