# Contribution Guide for Suuq.io API

Thank you for your interest in contributing to the Suuq.io API! This guide outlines the coding standards and practices we follow to maintain a clean, consistent, and high-quality codebase.

## General Guidelines
- Follow the **Single Responsibility Principle (SRP)**: Each module, function, or class should have one clear responsibility.
- Write reusable and modular code using **Object-Oriented Programming (OOP)** principles.
- Adhere to **DRY (Don’t Repeat Yourself)** principles: Avoid duplicating code unnecessarily.
- Use meaningful, descriptive names for variables, functions, classes, and files.
- Maintain a consistent coding style by following the provided rules and examples below.

## Coding Standards

### Language and Framework
- Use **TypeScript** for all code.
- Use **Express.js** as the web framework.
- Use **DynamoDB** for database operations.

### File Naming
- Use **PascalCase** for class files (e.g., `AuthController.ts`).
- Use **camelCase** for function and variable names (e.g., `handleRequest`, `userPhone`).
- Keep file and folder names lowercase unless they represent a class.

### Code Formatting
- Use 2 spaces for indentation.
- Place imports at the top of the file, grouped logically:
  - First: Node.js core modules (e.g., `fs`, `path`).
  - Second: External modules (e.g., `express`, `dotenv`).
  - Third: Internal modules (e.g., `./model/User`).
- Use **ESLint** and **Prettier** to enforce formatting and linting.

### Function and Method Rules
- Functions should be short and perform a single task.
- Use **async/await** for asynchronous operations.
- Always include return types for functions and methods:
  ```typescript
  async registerUser(userData: User): Promise<User> {
      // Implementation
  }
  ```
- Write clear and concise comments for complex logic.

### Error Handling
- Use `try/catch` blocks to handle errors in asynchronous functions:
  ```typescript
  try {
      const user = await userService.findByPhone(phone);
  } catch (error) {
      console.error('Error fetching user:', error);
  }
  ```
- Log errors using a centralized logging service or a utility function.

## Folder Structure
- Group related files into logical folders:
  ```
  src
  ├── config      # Configuration files (e.g., AppConfig.ts)
  ├── controllers # Route handlers (e.g., AuthController.ts)
  ├── middleware  # Middleware (e.g., AuthMiddleware.ts)
  ├── model       # Database models (e.g., User.ts, BaseModel.ts)
  ├── routes      # Route definitions (e.g., index.ts)
  ├── services    # Business logic (e.g., Server.ts)
  └── index.ts    # Entry point
  ```

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

## Testing Guidelines
- Write unit tests for all functions and classes using **Jest** or your preferred testing framework.
- Place tests in a separate `tests` directory, mirroring the `src` folder structure.
- Use descriptive test names and ensure high test coverage:
  ```typescript
  describe('AuthController', () => {
      it('should register a new user', async () => {
          // Test implementation
      });
  });
  ```
- To run tests, use:
  ```
  npm test
  ```

## Pull Request Guidelines
- Ensure your branch is up-to-date with the `main` branch before creating a pull request:
  ```
  git pull origin main
  ```
- Address all comments and requested changes during the review process.
- Include a description of the changes in the pull request.

## Additional Tools and Extensions
- Install **Prettier** and **ESLint** extensions for your editor.
- Use **VS Code** for consistency (recommended settings are included in `.vscode/settings.json`).
- Use a Node.js version manager like `nvm` to ensure compatibility.

## Communication
- For questions or discussions, open a GitHub issue or use the project's communication channels.

## Thank You!
Your contributions make Suuq.io better. We appreciate your time and effort!
