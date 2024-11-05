const httpStatus = require('http-status');
const { HealthForm } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a health form
 * @param {Object} healthFormBody
 * @returns {Promise<HealthForm>}
 */
const createHealthForm = async (healthFormBody) => {
  if (await HealthForm.hasFormDeclaredInLast24Hours(healthFormBody.name)) {
    await HealthForm.findOneAndUpdate({
      name: healthFormBody.name,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }, healthFormBody).exec()
    return {
      success: true
    }
    // throw new ApiError(httpStatus.BAD_REQUEST, 'You have already submitted a health declaration form in the last 24 hours');
  }
  return HealthForm.create(healthFormBody);
};

/**
 * Query for health forms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const fetchHealthForms = async (filter, options) => {
  const healthForms = await HealthForm.paginate(filter, options);
  return healthForms;
}


const getHealthFormById = async (healthFormId) => {
  const healthForm = await HealthForm.findById(healthFormId);
  if (!healthForm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Health form not found');
  }

  return healthForm
}

module.exports = {
  createHealthForm,
  fetchHealthForms,
  getHealthFormById
}
