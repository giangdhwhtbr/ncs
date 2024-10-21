const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const healthFormValidation = require('../../validations/health_form.validation');
const healthFormController = require('../../controllers/health_form.controller');

const router = express.Router();

router
  .get('/', auth('manageHealthForms'), validate(healthFormValidation.getHealthForms), healthFormController.getHealthForms)
  .post('/', validate(healthFormValidation.createHealthForm), healthFormController.createHealthForm);

router.get(
  '/:healthFormId',
  auth('manageHealthForms'),
  validate(healthFormValidation.getHealthFormById),
  healthFormController.getHealthFormById
);

module.exports = router;
