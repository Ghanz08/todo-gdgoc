# 📝 Todo List REST API

The Todo List REST API provides endpoints to manage tasks and user authentication. Built with Node.js, Express, and MySQL.

## 📦 Base URL
The base URL for the API is: https://todo-gdgoc.up.railway.app/

## 🛠️ Setup
```bash
# Clone repository
git clone https://github.com/Ghanz08/todo-gdgoc.git

# Install dependencies
npm install

# Start server
npm start

# Development mode
npm run dev
```

## 🔑 Available Endpoints

### Authentication
- `POST /api/auth/register` - Register New User
- `POST /api/auth/login` - Login User
- `POST /api/auth/logout` - Logout User

### Todo Management
- `POST /api/todos` - Create New Todo
- `GET /api/todos` - List All Todos
- `GET /api/todos/:id` - Get Todo Detail
- `PUT /api/todos/:id` - Update Todo
- `DELETE /api/todos/:id` - Delete Todo

## 📝 API Documentation

### Authentication

#### Register New User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**: 
  - `201 Created` - Registration successful
  - `400 Bad Request` - Invalid input
  - `500 Internal Server Error` - Server error

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK` - Login successful with JWT token
  - `401 Unauthorized` - Invalid credentials
  - `500 Internal Server Error` - Server error
  
#### Logout
- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer [token]`
- **Response**:
    - `200 OK` - Logout successful
    - `401 Unauthorized` - Invalid/missing token
    - `500 Internal Server Error` - Server error

### Todo Management

#### Create New Todo
- **URL**: `/api/todos`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer [token]`
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "pending"
  }
  ```
- **Response**: 
  - `201 Created` - Todo created successfully
  - `401 Unauthorized` - Invalid/missing token
  - `500 Internal Server Error` - Server error

#### List All Todos
- **URL**: `/api/todos`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer [token]`
- **Response**:
  - `200 OK` - List of todos
  - `401 Unauthorized` - Invalid/missing token
  - `500 Internal Server Error` - Server error

#### Get Todo Detail
- **URL**: `/api/todos/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer [token]`
- **Response**:
  - `200 OK` - Todo details
  - `404 Not Found` - Todo not found
  - `401 Unauthorized` - Invalid/missing token
  - `500 Internal Server Error` - Server error

#### Update Todo
- **URL**: `/api/todos/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer [token]`
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "completed"
  }
  ```
- **Response**:
  - `200 OK` - Todo updated successfully
  - `404 Not Found` - Todo not found
  - `401 Unauthorized` - Invalid/missing token
  - `500 Internal Server Error` - Server error

#### Delete Todo
- **URL**: `/api/todos/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer [token]`
- **Response**:
  - `200 OK` - Todo deleted successfully
  - `404 Not Found` - Todo not found
  - `401 Unauthorized` - Invalid/missing token
  - `500 Internal Server Error` - Server error

## 💾 Database Schema
```sql
CREATE TABLE users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password_hash varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE todos (
  todo_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  description text DEFAULT NULL,
  due_date date DEFAULT NULL,
  priority enum('low','medium','high') DEFAULT 'medium',
  is_complete tinyint(1) DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (todo_id),
  KEY user_id (user_id),
  CONSTRAINT todos_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## 🔧 Technologies Used
- Node.js
- Express
- MySQL
- JWT for authentication
- CORS
- bcrypt for password hashing
