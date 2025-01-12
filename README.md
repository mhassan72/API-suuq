# Express TypeScript Authentication API

## Description
This project is a RESTful API built using TypeScript and Express. 
It includes user registration and authentication features, with secure password handling and JWT-based authentication.

## Features
- User registration with hashed secrets (passwords)
- JWT token generation and decoding
- Structured codebase following OOP principles
- Connection to DynamoDB via a reusable `BaseModel` class
- Dynamic routing for scalability

## Prerequisites
- Node.js (version 14 or later)
- DynamoDB (AWS or local setup)
- A `.env` file with the following keys:
  - `PORT`: Port for the server to listen on
  - `JWT_SECRET`: Secret key for JWT token encoding
  - `AWS_ACCESS_KEY_ID`: AWS access key ID for DynamoDB
  - `AWS_SECRET_ACCESS_KEY`: AWS secret access key for DynamoDB
  - `AWS_REGION`: AWS region for DynamoDB

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd <project-directory>
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add the required environment variables.

## Running the Application
- To start the server in development mode:
  ```
  npm run dev
  ```
- To build and run the server in production mode:
  ```
  npm run build
  npm start
  ```

## Project Structure
```
src
├── config
│   └── AppConfig.ts      # Application configuration (e.g., environment variables)
├── controllers
│   ├── AuthController.ts # Handles authentication logic
│   └── BaseController.ts # Abstract class for controllers
├── middleware
│   └── AuthMiddleware.ts # Middleware for protecting routes
├── model
│   ├── BaseModel.ts      # Base class for DynamoDB interactions
│   └── User.ts           # User model extending BaseModel
├── routes
│   └── index.ts          # Dynamic route definitions
├── services
│   └── Server.ts         # Server initialization and setup
└── index.ts              # Entry point of the application
```

## Example Usage
- **Register a User**:
  ```
  POST /auth/register
  Body:
  {
    "phone": "+1234567890",
    "secret": "password123",
    "avatar_url": "https://example.com/avatar.jpg"
  }
  ```
  Response:
  ```
  {
    "message": "User registered successfully",
    "user": {
      "phone": "+1234567890",
      "avatar_url": "https://example.com/avatar.jpg"
    },
    "token": "<JWT_TOKEN>"
  }
  ```

## Testing
- Add unit and integration tests using your preferred testing framework (e.g., Jest or Mocha).
- To run tests:
  ```
  npm test
  ```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a detailed explanation of your changes.

## License
This project is licensed under the MIT License.
