const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHealthForm = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    temperature: Joi.number().min(36).max(42).required(),
    cough: Joi.boolean().required(),
    soreThroat: Joi.boolean().required(),
    lossOfSmell: Joi.boolean().required(),
    fever: Joi.boolean().required(),
    breathingDifficulty: Joi.boolean().required(),
    bodyAches: Joi.boolean().required(),
    headache: Joi.boolean().required(),
    fatigue: Joi.boolean().required(),
    diarrhea: Joi.boolean().required(),
    runnyNose: Joi.boolean().required(),
    contactWithCovidPatient: Joi.boolean().required(),
  }),
};

const getHealthForms = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHealthFormById = {
  params: Joi.object().keys({
    healthFormId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHealthForm,
  getHealthForms,
  getHealthFormById,
}
