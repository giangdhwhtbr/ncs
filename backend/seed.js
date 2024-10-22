const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const userService = require('./src/services/user.service');
const { HealthForm } = require('./src/models');
const config = require('./src/config/config');

const dotenv = require('dotenv');
dotenv.config()

const healthforms = [];
for (let i = 0; i < 100; i++) {
  healthforms.push({
    name: faker.person.fullName(),
    temperature: faker.number.float({ min: 36, max: 42, fractionDigits: 1 }),
    cough: faker.datatype.boolean(),
    soreThroat: faker.datatype.boolean(),
    lossOfSmell: faker.datatype.boolean(),
    fever: faker.datatype.boolean(),
    breathingDifficulty: faker.datatype.boolean(),
    bodyAches: faker.datatype.boolean(),
    headache: faker.datatype.boolean(),
    fatigue: faker.datatype.boolean(),
    diarrhea: faker.datatype.boolean(),
    runnyNose: faker.datatype.boolean(),
    contactWithCovidPatient: faker.datatype.boolean(),
  });
}

const seed = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    console.log('Connected to MongoDB');
    const admin = await userService.seedAdmin();
    console.log(`Admin account created: ${admin.email}`);
    await HealthForm.create(healthforms);
    console.log('Seed HealthForms successfully');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
}

seed();

