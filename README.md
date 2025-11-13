# Employee Management API

A RESTful API for managing employee information built with Node.js, Express, TypeScript, and Prisma ORM.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Language**: TypeScript v5.9.3
- **ORM**: Prisma v6.19.0
- **Database**: SQLite
- **Validation**: Zod v4.1.12
- **Environment Variables**: dotenv v17.2.3

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd empolyemanagment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

Base URL: `http://localhost:3000/api/v1/employee`

### 1. Add Employee
Create a new employee record.

**URL:** `http://localhost:3000/api/v1/employee/add-employee`

**Method:** `POST`

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/v1/employee/add-employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Software Engineer",
    "salary": 75000
  }'
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "position": "Software Engineer",
  "salary": 75000
}
```

**Response (Success - 200):**
```json
{
  "msg": "employe created"
}
```

**Response (Error - 400):**
- If employee already exists: `"employee already exists"`
- If validation fails: `"input error while adding employee info"`

---

### 2. Get All Employees
Retrieve a paginated list of all employees.

**URL:** `http://localhost:3000/api/v1/employee/view-employees`

**Method:** `GET`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of records per page (default: 10)

**cURL Examples:**
```bash
# Get all employees (default pagination)
curl -X GET http://localhost:3000/api/v1/employee/view-employees

# Get employees with pagination
curl -X GET "http://localhost:3000/api/v1/employee/view-employees?page=1&limit=10"
```

**Response (Success - 200):**
```json
{
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "position": "Software Engineer",
      "salary": 75000,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Employee by ID
Retrieve a specific employee by their ID.

**URL:** `http://localhost:3000/api/v1/employee/view-employees/:id`

**Method:** `GET`

**URL Parameters:**
- `id`: Employee ID (integer)

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/v1/employee/view-employees/1
```

**Response (Success - 200):**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Software Engineer",
    "salary": 75000,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "msg": "user doesnot exists"
}
```

---

### 4. Update Employee
Update an existing employee's information.

**URL:** `http://localhost:3000/api/v1/employee/update-employee/:id`

**Method:** `PUT`

**URL Parameters:**
- `id`: Employee ID (integer)

**cURL Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/employee/update-employee/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "position": "Senior Software Engineer",
    "salary": 90000
  }'
```

**Request Body:**
```json
{
  "name": "John Smith",
  "position": "Senior Software Engineer",
  "salary": 90000
}
```

**Note:** All fields in the request body are optional. Only provided fields will be updated.

**Response (Success - 200):**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john.doe@example.com",
  "position": "Senior Software Engineer",
  "salary": 90000,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (Error - 500):**
```json
{
  "error": "Failed to update employee <error details>"
}
```

---

### 5. Delete Employee
Delete an employee record.

**URL:** `http://localhost:3000/api/v1/employee/delete-employee`

**Method:** `DELETE`

**Note:** The delete endpoint route currently doesn't include `:id` in the path, but the controller expects `req.params.id`. You may need to update the route to `/delete-employee/:id` for this to work properly.

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/employee/delete-employee
```

**Response (Success - 204):**
```
"emplpoyee deleted succesfully"
```

**Response (Error - 500):**
```json
{
  "error": "Failed to delete employee"
}
```

## Database Schema

The Employee model has the following structure:

```prisma
model employee {
  id          Int        @default(autoincrement()) @id
  name        String
  email       String     @unique
  position    String
  salary      Int
  createdAt   DateTime   @default(now())
}
```

## Project Structure

```
empolyemanagment/
├── src/
│   ├── config/
│   │   ├── dbconfig.ts      # Prisma client configuration
│   │   └── types.ts          # Zod validation schemas
│   ├── controller/
│   │   └── employee.controller.ts  # Business logic
│   ├── routes/
│   │   └── employee.route.ts       # Route definitions
│   └── index.ts                     # Application entry point
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── dist/                     # Compiled JavaScript files
└── package.json
```

## Validation

Employee data is validated using Zod schemas:
- `name`: String (required)
- `email`: Valid email format (required, unique)
- `position`: String (required)
- `salary`: Number (required)

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `204`: Success (No Content)
- `400`: Bad Request (validation errors, employee not found)
- `500`: Internal Server Error

## Quick Reference - All Endpoints

Here are all the testable URLs for quick access:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `http://localhost:3000/api/v1/employee/add-employee` | Add a new employee |
| `GET` | `http://localhost:3000/api/v1/employee/view-employees` | Get all employees (with pagination) |
| `GET` | `http://localhost:3000/api/v1/employee/view-employees/:id` | Get employee by ID |
| `PUT` | `http://localhost:3000/api/v1/employee/update-employee/:id` | Update employee by ID |
| `DELETE` | `http://localhost:3000/api/v1/employee/delete-employee` | Delete employee |

**Example URLs (replace `:id` with actual ID):**
- `http://localhost:3000/api/v1/employee/view-employees/1`
- `http://localhost:3000/api/v1/employee/update-employee/1`
- `http://localhost:3000/api/v1/employee/view-employees?page=1&limit=10`

## License

ISC

