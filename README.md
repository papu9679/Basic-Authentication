# Basic Authentication API

A simple employee management API built with Node.js, Express, MongoDB, Mongoose, and bcrypt.

The API stores employee records in MongoDB. New employee passwords are hashed with bcrypt before they are saved. Protected routes authenticate an employee using the `id` and `password` values in the request body, and the endpoint that returns all employees is restricted to employees in the `HR` department.

## Requirements

- Node.js 18 or later
- MongoDB (local or hosted)
- npm

## Installation

1. Clone the repository and move into the project directory:

   ```bash
   git clone <repository-url>
   cd Basic-Authentication
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/basic-authentication
   ```

   Replace `MONGO_URI` with the connection string for your MongoDB instance if necessary.

## Running the application

Start the server with:

```bash
node index.js
```

For development with automatic restarts:

```bash
npm run dev
```

The server listens on the port specified by `PORT`.

## API endpoints

### Health check

```http
GET /
```

Returns:

```text
Sayan
```

### Create one employee

```http
POST /employee
Content-Type: application/json
```

Request body:

```json
{
  "id": 101,
  "name": "Alex Johnson",
  "salary": 75000,
  "dept": "Engineering",
  "password": "name123"
}
```

The password is hashed before the employee is stored.

Example:

```bash
curl -X POST http://localhost:3000/employee ^
  -H "Content-Type: application/json" ^
  -d "{\"id\":101,\"name\":\"Alex Johnson\",\"salary\":75000,\"dept\":\"Engineering\",\"password\":\"name123\"}"
```

### Create multiple employees

```http
POST /employee/many
Content-Type: application/json
```

Request body:

```json
[
  {
    "id": 102,
    "name": "Taylor Smith",
    "salary": 80000,
    "dept": "HR",
    "password": "name123"
  },
  {
    "id": 103,
    "name": "Jordan Lee",
    "salary": 70000,
    "dept": "Finance",
    "password": "name123"
  }
]
```

Each password is hashed before the employees are inserted.

### Get one employee

```http
GET /employee
Content-Type: application/json
```

Request body:

```json
{
  "id": 101,
  "password": "name123"
}
```

The employee must provide valid credentials for authentication.

### Get all employees

```http
GET /employee/all
Content-Type: application/json
```

Request body:

```json
{
  "id": 102,
  "password": "name123"
}
```

This endpoint requires valid credentials and an employee whose `dept` is `HR`.

## Employee schema

| Field | Type | Description |
| --- | --- | --- |
| `id` | Number | Unique employee identifier |
| `name` | String | Employee name |
| `salary` | Number | Employee salary |
| `dept` | String | Employee department |
| `password` | String | Stored as a bcrypt hash |

## Project structure

```text
.
├── config/
│   └── db.js                  # MongoDB connection
├── middleware/
│   └── verify.js              # Authentication and HR authorization
├── model/
│   └── employeeModel.js      # Employee schema
├── routes/
│   └── employeeRoutes.js     # Employee API routes
├── index.js                  # Express application entry point
├── package.json
└── README.md
```

## Notes

- Do not commit `.env` files or database credentials.
- The current API sends credentials in a request body for protected `GET` routes. For production use, prefer a standard authentication mechanism such as a session or an `Authorization` header over HTTPS.
- The project does not currently include automated tests.