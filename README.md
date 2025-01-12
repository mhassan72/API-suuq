# Suuq.io API Documentation

Welcome to the Suuq.io API! This document provides an overview for both users and contributors to the project.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contribution Guide](#contribution-guide)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Git Workflow](#git-workflow)
- [Contact Information](#contact-information)
---

## Introduction
Suuq.io is an online marketplace API designed to provide robust and scalable functionality for listing, buying, and selling goods. This API is built using TypeScript, Node.js, and Express.js, with DynamoDB as the database.

---

## Features
- User authentication and authorization
- Dynamic and modular route handling
- DynamoDB integration for scalability
- Object-Oriented Programming (OOP) principles
- Adherence to DRY and SRP coding practices

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- DynamoDB (local or AWS setup)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/suuq-io/api.git
   cd api
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file at the root of the project:
   ```
   PORT=3000
   DB_REGION=us-east-1
   ACCESS_KEY=your-access-key
   SECRET_KEY=your-secret-key
   ```
4. Start the server:
   ```
   npm start
   ```

---

## Folder Structure
```
src
├── config        # Configuration files (e.g., AppConfig.ts)
├── controllers   # Route handlers (e.g., AuthController.ts)
├── middleware    # Middleware logic (e.g., AuthMiddleware.ts)
├── model         # Database models (e.g., User.ts, BaseModel.ts)
├── routes        # Route definitions (e.g., index.ts)
├── services      # Business logic (e.g., Server.ts)
├── tests         # Unit and integration tests
└── index.ts      # Entry point
```

---

## API Endpoints
- **POST /auth/register**: Registers a new user and returns a WebToken.
- **POST /auth/login**: Authenticates the user and returns a WebToken.
- **GET /users**: Fetches all users (admin only).
- **GET /users/:phone**: Fetches a user by phone number.

---

## Contribution Guide

### General Guidelines
- Follow **Single Responsibility Principle (SRP)**.
- Write reusable and modular code using **OOP** principles.
- Adhere to **DRY (Don’t Repeat Yourself)** principles.
- Use meaningful, descriptive names for variables, functions, classes, and files.

### Coding Standards
- Use **TypeScript** for all code.
- Maintain a consistent coding style:
  - Use 2 spaces for indentation.
  - Always include return types for functions and methods.
- Use **async/await** for asynchronous operations.
- Write clear and concise comments for complex logic.

---

### Testing Guidelines
- Write unit tests for all functions and classes using **Jest** or your preferred testing framework.
- Place tests in the `tests` directory, mirroring the `src` folder structure.
- Use descriptive test names and ensure high test coverage:
  ```typescript
  describe('AuthController', () => {
      it('should register a new user', async () => {
          // Test implementation
      });
  });
  ```
- To run tests:
  ```
  npm test
  ```

---

## Git Workflow
- Create a new branch for each feature or bugfix:
  ```
  git checkout -b feature/new-feature-name
  ```
- Write clear and descriptive commit messages:
  ```
  git commit -m "Add user authentication feature"
  ```
- Push changes to your branch and submit a pull request.
- Address all comments and requested changes during the review process.

---

## Contact Information
If you have questions or need support, contact the Suuq.io development team at support@suuq.io.

---

## Thank You!
Your contributions and feedback are vital to the success of Suuq.io. Together, we can build an amazing marketplace platform!
