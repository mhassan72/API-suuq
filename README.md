# Suuq.io API Documentation

Welcome to the Suuq.io API! This documentation serves as your guide to understanding and using our API, built to help improve the economy and livelihood of the people of Mogadishu. With Suuq.io, buying anything you wish has never been easier—just like 1-2-3. This API is supported by both a web and mobile app, each housed in their own repositories. 

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
Suuq.io is a dynamic online marketplace API designed to support the vibrant community of Mogadishu by providing a seamless platform to list, buy, and sell goods. With a focus on simplicity and ease, we built this API with TypeScript, Node.js, Express.js, and DynamoDB to ensure scalability and reliability.

---

## Features
- Easy-to-use user authentication and authorization system
- Modular and dynamic route handling for flexibility
- Scalable DynamoDB integration
- Built with Object-Oriented Programming (OOP) principles for maintainable code
- Adherence to DRY (Don't Repeat Yourself) and SRP (Single Responsibility Principle) to keep the codebase clean and efficient

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
If you have any questions or need support, feel free to reach out to the Suuq.io development team at support@suuq.io.

---

## Thank You!
Your contributions and feedback are essential to making Suuq.io a successful platform. Let's work together to improve the lives of the people of Mogadishu and beyond!
