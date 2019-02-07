// campaigns-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const locations = new Schema({
      name: { type: String, required: true, minLength: 1, maxLength: 120 },
      city: { type: String, required: true, minLength: 1, maxLength: 120 },
      price: { type: Number, required: true, minLength: 1, maxLength: 120 },
      festival: { type: String },
      phone: { type: Number, minLength: 1, maxLength: 120 },
      startLocation: { type: Date, required: true},
      endLocation: { type: Date, require: true },
      pictures: { type: String },
      description: { type: String },
      comments: { type: Object },
      rate: { type: Number },
    }, {
      timestamps: true
    });
  
    return mongooseClient.model('locations', locations);
  };
  