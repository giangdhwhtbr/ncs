const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const healthFormSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    cough: {
      type: Boolean,
      required: true,
    },
    soreThroat: {
      type: Boolean,
      required: true,
    },
    lossOfSmell: {
      type: Boolean,
      required: true,
    },
    fever: {
      type: Boolean,
      required: true,
    },
    breathingDifficulty: {
      type: Boolean,
      required: true,
    },
    bodyAches: {
      type: Boolean,
      required: true,
    },
    headache: {
      type: Boolean,
      required: true,
    },
    fatigue: {
      type: Boolean,
      required: true,
    },
    diarrhea: {
      type: Boolean,
      required: true,
    },
    runnyNose: {
      type: Boolean,
      required: true,
    },
    contactWithCovidPatient: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
healthFormSchema.plugin(toJSON);
healthFormSchema.plugin(paginate);

/**
 * Check if form with the same name was created in the last 24 hours
 * @param {string} name - The form's name
 * @returns {Promise<boolean>}
 */
healthFormSchema.statics.hasFormDeclaredInLast24Hours = async function (name) {
  const existed = await this.findOne({ name, createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
  return !!existed;
};

/**
 * @typedef Token
 */
const HealthFormSchema = mongoose.model('HealthFormSchema', healthFormSchema, 'healthforms');

module.exports = HealthFormSchema;
