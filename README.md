# Take home Assignment. [GovTech] [CMP portal]

## Assumption

1. Public user access the website and be able to declare his/her health information.
2. Each user can declare health information 1 time per day
3. Only admin can login to the website and view the list of declared health information.

## Notes

Backend was created using the expressjs boiler plate: https://github.com/hagopj13/node-express-boilerplate

This is a quick start project with several existed apis support for authentication. Because the requirement is just building features for Health Declaration Form, so that please look at my code at:

backend/src/routes/v1/health_form.route.js
backend/src/controllers/health_form.controller.js
backend/src/services/health_form.service.js
backend/src/models/health_form.model.js
backend/tests/integration/health_forms.test.js


## Quick Start

Live Site http://18.135.5.111/

### Docker environment

To run the application, both backend and frontend, simply run the command below: 

```
docker-compose up -d
```

In order to run test

```
// test all test cases
docker exec ncs_backend yarn test

// test health forms only
docker exec ncs_backend yarn test tests/integration/health_forms.test.js
```

```
docker exec ncs_frontend yarn test
```

In order to seed for example data

```
docker exec ncs_backend yarn seed

docker restart ncs_backend
```

Application up and running at: http://localhost:8080

### Native environment

```
cd backend
yarn install

// Create .env file
cp .env.example .env

// Replace MONGODB_URL=mongodb://admin:admin@localhost:27017/ncs?authSource=admin&retryWrites=true

// test all test cases
yarn test

// test health forms only
yarn test tests/integration/health_forms.test.js

// seed example data
yarn seed

// run the application 
yarn start

```

```
cd frontend
yarn install

// test
yarn test

// create env file
touch .env

// add API endpoint
echo "VITE_REACT_APP_API_URL=http://localhost:3000" >> .env

// build application 
yarn build

// run application
yarn preview
```

Application up and running at: http://localhost:4173


In order to login, please use the credential below, which is configured in .env file

```
ADMIN_EMAIL=admin@localhost.dev
ADMIN_PASSWORD=Admin@123
```
