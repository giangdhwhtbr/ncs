const { Seeder } = require('mongo-seeding');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const seeder = new Seeder({
  database: process.env.MONGODB_URL,
  dropDatabase: true,
});

const collections = seeder.readCollectionsFromPath(path.resolve('./data'))

seeder
  .import(collections)
  .then(() => {
    console.log("Data imported successfully");
    // Do whatever you want after successful import
  })
  .catch((err) => {
    console.log(err);
    // Handle errors
  });
