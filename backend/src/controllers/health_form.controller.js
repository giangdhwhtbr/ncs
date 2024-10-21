const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const healthFormService = require('../services/health_form.service');

const createHealthForm = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.createHealthForm(req.body);
  res.status(httpStatus.CREATED).send(healthForm);
});

const getHealthForms = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filters = pick(req.query, ['name']);
  if (filters.name) {
    filters.name =  { $regex: req.query.name, $options: 'i' };
  }
  const result = await healthFormService.fetchHealthForms(
    filters,
    options
  );
  res.send(result);
});

const getHealthFormById = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.getHealthFormById(req.params.healthFormId);
  res.send(healthForm);
});

module.exports = {
  createHealthForm,
  getHealthForms,
  getHealthFormById,
};
