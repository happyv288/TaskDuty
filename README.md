# TaskDuty – Personal Task Manager

TaskDuty is a responsive personal task management application built as part of the **Techstudio Internship Program**.

The project includes:

- **Stage 1, Week 1:** Foundational CRUD Application
- **Stage 2, Week 2:** Backend CRUD, Authentication and Authorization

## Features

### Stage 1 – Frontend

- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Filter tasks by category
- Filter tasks by completion status
- Form validation
- Due date validation
- Responsive frontend design
- Local task persistence using browser localStorage

### Stage 2 – Backend

- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- User-scoped task data
- Authorization based on task ownership
- Authenticated CRUD operations
- Invalid and expired token protection

## Task Fields

Each task contains:

- Title
- Description
- Due date
- Category
- Completion status
- User ownership

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Vite
- Browser localStorage

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)

### Testing

- Postman

## Project Structure

```text
TaskDuty/
├── client/
│   ├── src/
│   └── ...
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/happyv288/TaskDuty.git
```

### 2. Open the project

```bash
cd TaskDuty
```

## Frontend Setup

### 3. Go into the client folder

```bash
cd client
```

### 4. Install dependencies

```bash
npm install
```

### 5. Start the frontend development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Backend Setup

### 6. Open a new terminal and go into the server folder

From the project root:

```bash
cd server
```

### 7. Install backend dependencies

```bash
npm install
```

### 8. Create the environment file

Inside the `server` folder, create a file named:

```text
.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit your actual MongoDB connection string or JWT secret to GitHub.

### 9. Start the backend server

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Backend API

### Authentication

#### Register

```text
POST /api/auth/register
```

Example request body:

```json
{
  "name": "Happiness",
  "email": "happiness@test.com",
  "password": "Password123"
}
```

#### Login

```text
POST /api/auth/login
```

Example request body:

```json
{
  "email": "happiness@test.com",
  "password": "Password123"
}
```

The login response provides a JWT token.

### Task Routes

The task routes require authentication.

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

For protected requests, send the JWT token using:

```text
Authorization: Bearer <token>
```

## Authorization and User-Scoped Data

Each task is associated with the authenticated user's ID.

A user can:

- Create their own tasks
- View their own tasks
- Update their own tasks
- Delete their own tasks

A user cannot access, update, or delete another user's tasks.

The backend checks both the task ID and authenticated user ID when performing protected task operations.

## Testing with Postman

The backend can be tested independently using Postman.

Recommended testing flow:

1. Register a user.
2. Log in and obtain a JWT token.
3. Try accessing `/api/tasks` without a token.
4. Confirm the request is rejected.
5. Use the JWT token to create a task.
6. Retrieve the authenticated user's tasks.
7. Register and log in as a second user.
8. Confirm the second user cannot access the first user's task.
9. Confirm the second user cannot update or delete the first user's task.
10. Test an invalid token and confirm it is rejected.
11. Confirm the task owner can perform CRUD operations on their own task.


## Known Issues

No known issues at the time of submission.

## Internship

**Program:** Techstudio Internship Program
**Stage:** Stage 1 and Stage 2
**Week 1:** Foundational CRUD Application
**Week 2:** Backend CRUD, Authentication and Authorization
**Theme:** Personal Task Manager
