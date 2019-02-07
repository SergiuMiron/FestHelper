// wishlist-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const wishlist = new Schema({
    idOfLocation: { type: String },
    username: { type: String },
    name: { type: String, unique: true, required: true, minLength: 1, maxLength: 120 },
    city: { type: String, required: true, minLength: 1, maxLength: 120 },
    price: { type: Number, required: true, minLength: 1, maxLength: 120 },
    phone: { type: Number, minLength: 1, maxLength: 120 },
    festival: { type: String },
    startLocation: { type: Date, required: true},
    endLocation: { type: Date, require: true },
    pictures: { type: String },
    description: { type: String },
    rate: { type: Number }
  }, {
    timestamps: true
  });

  return mongooseClient.model('wishlist', wishlist);
};
