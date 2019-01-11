// campaigns-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const campaigns = new Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 120 },
    owner: { type: String, required: true, minLength: 1, maxLength: 120 },
    javaCandidates: { type: Number, required: true, min: 0, max: 100 },
    dotnetCandidates: { type: Number, required: true, min: 0, max: 100 },
    uiCandidates: { type: Number, required: true, min: 0, max: 100  },
    androidCandidates: { type: Number, required: true, min: 0, max: 100 },
    iosCandidates: { type: Number, required: true, min: 0, max: 100 },
    testingCandidates: { type: Number, required: true, min: 0, max: 100 },
    amCandidates: { type: Number, required: true, min: 0, max: 100 },
    startCampaign: { type: Date, required: true  },
    startPromoting: { type: Date, required: true  },
    startTests: { type: Date, required: true  },
    endTests: { type: Date, required: true  },
    startInternship: { type: Date, required: true  },
    endInternship: { type: Date, required: true  }
  }, {
    timestamps: true
  });

  return mongooseClient.model('campaigns', campaigns);
};
