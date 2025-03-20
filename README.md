# SuperTodo

A simple todo application with free and premium plan features built using NestJS and Vue.js.

## Features

### Free Plan
- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ View basic todo information

### Premium Plan
- 🌟 All free plan features
- 🌟 Add notes to todos
- 🌟 View and edit notes

## Tech Stack

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Testing:** Jest

### Frontend
- **Framework:** Vue.js
- **Styling:** TailwindCss
- **Language:** TypeScript
- **Testing:** Vitest

## Project Structure

```plaintext
SuperTodo/
├── backend/
│   ├── src/
│   │   ├── common/
│   │   │   └── exceptions/
│   │   │       └── permission.exception.ts
│   │   ├── todo/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── todo.controller.ts
│   │   │   └── todo.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── test/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── TodoList.vue
    │   ├── types/
    │   ├── App.vue
    │   └── main.ts
    └── tests/
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/SuperTodo.git
cd SuperTodo

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

```bash
# Start backend (from backend directory)
cd backend
npm run start:dev

# In a new terminal, start frontend
cd frontend
npm run dev
```

Access the application:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

### Testing

```bash
# Backend tests
cd backend
npm run test        # Run unit tests
npm run test:cov    # Run tests with coverage
npm run test:e2e    # Run end-to-end tests

# Frontend tests
cd frontend
npm run test:unit
```

## API Endpoints

| Method | Endpoint      | Description      | Query Parameter |
|--------|--------------|------------------|----------------|
| GET    | `/todos`     | Get all todos    | `userRole`     |
| GET    | `/todos/:id` | Get single todo  | `userRole`     |
| POST   | `/todos`     | Create todo      | `userRole`     |
| PATCH  | `/todos/:id` | Update todo      | `userRole`     |
| DELETE | `/todos/:id` | Delete todo      | -              |

### User Role Parameter

Add `?userRole=paid` or `?userRole=free` to API requests:

```bash
# Example: Get todos as paid user
GET http://localhost:3000/todos?userRole=paid
```