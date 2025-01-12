# 🎉 Welcome to Suuq.io API! 🎉

Hey there! Welcome to the Suuq.io API documentation! 🚀 This guide will walk you through everything you need to know to get started with our amazing online marketplace API. Whether you're using the API as a user or contributing to the project, we've got you covered! 💥

## 📚 Table of Contents
- [✨ Introduction](#introduction)
- [🔥 Features](#features)
- [🚀 Getting Started](#getting-started)
- [📁 Folder Structure](#folder-structure)
- [📡 API Endpoints](#api-endpoints)
- [💡 Contribution Guide](#contribution-guide)
- [🖋️ Coding Standards](#coding-standards)
- [🧪 Testing Guidelines](#testing-guidelines)
- [🔀 Git Workflow](#git-workflow)
- [📧 Contact Information](#contact-information)
---

## ✨ Introduction
Suuq.io is the coolest online marketplace API around! 🌟 It allows users to easily list, buy, and sell goods, all powered by a dynamic and scalable backend built with TypeScript, Node.js, and Express.js. Plus, we’ve got DynamoDB handling all our data with style!

---

## 🔥 Features
Get ready for some powerful features! 💪
- 🔐 **User authentication & authorization**: Keep your data safe and sound.
- 🔄 **Dynamic & modular routes**: Flexible and adaptable to your needs.
- 🚀 **DynamoDB integration**: Scalable and efficient storage for your data.
- 🎯 **OOP Principles**: Code that’s clean, reusable, and object-oriented.
- ✨ **DRY & SRP**: We keep it DRY (Don’t Repeat Yourself) and follow the Single Responsibility Principle!

---

## 🚀 Getting Started

### Prerequisites
Before you start, make sure you've got the following tools:
- 🌐 Node.js (v16 or later)
- 🧶 npm or yarn
- 🛠️ DynamoDB (local or AWS setup)

### Installation
Ready to jump in? Let's get the API up and running! 😎
1. Clone the repo:
   ```
   git clone https://github.com/suuq-io/api.git
   cd api
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables:
   Create a `.env` file at the root of the project:
   ```
   PORT=3000
   DB_REGION=us-east-1
   ACCESS_KEY=your-access-key
   SECRET_KEY=your-secret-key
   ```
4. Start the server and enjoy:
   ```
   npm start
   ```

---

## 📁 Folder Structure
Here’s how we keep things organized! 🗂️
```
src
├── config        # All your configuration files (e.g., AppConfig.ts)
├── controllers   # Route handlers (e.g., AuthController.ts)
├── middleware    # Middleware logic (e.g., AuthMiddleware.ts)
├── model         # Database models (e.g., User.ts, BaseModel.ts)
├── routes        # Your route definitions (e.g., index.ts)
├── services      # Business logic (e.g., Server.ts)
├── tests         # Unit and integration tests
└── index.ts      # The entry point for the app
```

---

## 📡 API Endpoints
Check out the available routes to interact with our super cool API! 🌍
- **POST /auth/register**: Register a new user and get back a shiny WebToken. 🔑
- **POST /auth/login**: Log in and receive your WebToken for secure access. 🔐
- **GET /users**: Get a list of all users (admin only). 👥
- **GET /users/:phone**: Fetch a user by their phone number. 📞

---

## 💡 Contribution Guide

### General Guidelines
We're all about making this API as awesome as possible! Here's how you can help:
- Follow the **Single Responsibility Principle (SRP)** – one thing per function or class!
- Write code that's **modular** and **reusable** with **OOP** principles. 🔄
- Don’t repeat yourself! Adhere to **DRY (Don’t Repeat Yourself)**. ⚡
- Use **meaningful, descriptive names** for variables, functions, classes, and files. 💬

### 🖋️ Coding Standards
Here's the style we follow to keep things neat and tidy! 🧼
- Use **TypeScript** for all code.
- Stick to a consistent style:
  - Use **2 spaces** for indentation.
  - Always include **return types** for functions and methods.
- Use **async/await** for async operations (no callbacks, please!).
- Write clear comments for any tricky logic! 📝

---

### 🧪 Testing Guidelines
We love testing! 🧑‍🔬 Here’s how we do it:
- Write unit tests for every function and class using **Jest** or your preferred framework. ✅
- Organize tests in the `tests` folder, mirroring the `src` structure.
- Name tests clearly, so we know exactly what they’re testing! 🎯
- To run tests, just:
  ```
  npm test
  ```

---

## 🔀 Git Workflow
Let’s keep the git workflow smooth and simple! 💨
- Create a new branch for each feature or bugfix:
  ```
  git checkout -b feature/new-feature-name
  ```
- Write **clear and descriptive commit messages**:
  ```
  git commit -m "Add user authentication feature"
  ```
- Push your branch and submit a pull request.
- Address comments during the review process and keep things moving! 🚀

---

## 📧 Contact Information
Got questions or need support? Reach out to us! 📬
- Email us at: **support@suuq.io**

---

## 🎉 Thank You!
Thanks for being awesome and contributing to Suuq.io! Together, we’re building a fantastic online marketplace! 💫
