# Take home Assignment. [GovTech] [CMP portal]

## Assumption

1. Public user access the website and be able to declare his/her health information.
2. Each user can declare health information 1 time per day
3. Only admin can login to the website and view the list of declared health information.

## Quick Start

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