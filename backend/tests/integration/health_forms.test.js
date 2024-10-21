const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { HealthForm } = require('../../src/models');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { userOne, userTwo, admin, insertUsers } = require('../fixtures/user.fixture');
setupTestDB();

describe('Health Form Routes', () => {
  let healthForm;

  beforeEach(() => {
    healthForm = {
      name: faker.person.fullName(),
      temperature: 36.5,
      cough: false,
      soreThroat: false,
      lossOfSmell: false,
      fever: false,
      breathingDifficulty: false,
      bodyAches: false,
      headache: false,
      fatigue: false,
      diarrhea: false,
      runnyNose: false,
      contactWithCovidPatient: false,
    };
  });
  describe('POST /v1/health-forms', () => {
    test('should return 201 and successfully create health form if data is ok', async () => {
      const res = await request(app).post('/api/v1/health-forms').send(healthForm).expect(httpStatus.CREATED);
      expect(res.body).toMatchObject({
        name: healthForm.name,
        temperature: healthForm.temperature,
        cough: healthForm.cough,
        soreThroat: healthForm.soreThroat,
        lossOfSmell: healthForm.lossOfSmell,
        fever: healthForm.fever,
        breathingDifficulty: healthForm.breathingDifficulty,
        bodyAches: healthForm.bodyAches,
        headache: healthForm.headache,
        fatigue: healthForm.fatigue,
        diarrhea: healthForm.diarrhea,
        runnyNose: healthForm.runnyNose,
        contactWithCovidPatient: healthForm.contactWithCovidPatient,
      });
    });

    test('should return 400 error if name is missing', async () => {
      delete healthForm.name;

      await request(app).post('/api/v1/health-forms').send(healthForm).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if temperature is missing', async () => {
      delete healthForm.temperature;

      await request(app).post('/api/v1/health-forms').send(healthForm).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/health-forms', () => {
    test('should return 401 error if access token is missing', async () => {
      await request(app).get('/api/v1/health-forms').expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 200 and return all health forms', async () => {
      HealthForm.create(healthForm);
      await insertUsers([admin]);
      const res = await request(app)
        .get('/api/v1/health-forms')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
    });
  });
});
