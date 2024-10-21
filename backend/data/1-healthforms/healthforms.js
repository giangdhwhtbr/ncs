const { faker } = require('@faker-js/faker');

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

module.exports = healthforms;
