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

## Live Demo
- Frontend: [https://super-todo-wine.vercel.app](https://super-todo-wine.vercel.app)
- Backend: [https://super-todo-wine.vercel.app](https://super-todo-wine.vercel.app)

## API Endpoints

| Method | Endpoint | Description | Query Parameter |
|--------|----------|-------------|----------------|
| GET    | `/todo`  | Get todos   | `userRole`     |
| POST   | `/todo`  | Create todo | `userRole`     |
| PATCH  | `/todo/:id` | Update todo | `userRole`   |
| DELETE | `/todo/:id` | Delete todo | -            |

### Testing Production Build

```bash
# Test the production API
curl https://super-todo-wine.vercel.app/todo?userRole=paid

# Visit the live frontend
open https://super-todo-wine.vercel.app
```

## Tech Stack

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Testing:** Jest
- **Storage:** In-memory array

### Frontend
- **Framework:** Vue.js
- **Styling:** TailwindCSS
- **Language:** TypeScript
- **Testing:** Vitest
- **Environment:** Vite

## Project Structure

```plaintext
SuperTodo/
├── backend/
│   ├── src/
│   │   ├── common/
│   │   │   └── exceptions/
│   │   │       └── permission.exception.ts
│   │   ├── todo/
│   │   │   ├── __tests__/
│   │   │   │   ├── todo.controller.spec.ts
│   │   │   │   └── todo.service.spec.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-todo.dto.ts
│   │   │   │   └── update-todo.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── todo.entity.ts
│   │   │   ├── todo.controller.ts
│   │   │   ├── todo.service.ts
│   │   │   └── todo.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── test/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── __tests__/
    │   │   │   └── TodoList.spec.ts
    │   │   └── TodoList.vue
    │   ├── __tests__/
    │   │   └── App.spec.ts
    │   ├── types/
    │   │   └── todo.ts
    │   ├── App.vue
    │   ├── main.ts
    │   └── vite-env.d.ts
    ├── .env
    └── .env.production
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Environment Setup

Backend (.env):
```properties
PORT=3000
HOST=localhost
```

Frontend (.env):
```properties
VITE_SUPER_TODO_API_URL=http://localhost:3000/
```

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Development

```bash
# Start backend
cd backend
npm run start:dev

# Start frontend (new terminal)
cd frontend
npm run dev
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:cov

# Frontend tests
cd frontend
npm run test
npm run test:cov
```

## Technical Details

### Backend Implementation
- Uses in-memory array for todo storage
- Implements permission-based feature gating
- Colocated tests with source files

### Frontend Implementation
- Vue 3 Composition API
- TypeScript for type safety
- Vite for development and building
- Environment variables for API configuration
- Colocated component tests