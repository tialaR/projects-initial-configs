# Aplication Name

Description of the application.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Code Style](#code-style)
- [Folder Structure](#folder-structure)
- [Development Environment](#development-environment)
- [Commit Guidelines](#commit-guidelines)

---

## Getting Started

Prerequisites:

- [Node.js](https://nodejs.org/) (version 16.0.0 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/react-starter-kit.git
   ```
2. Install dependencies:

   ```bash
   yarn install
   ```

   ***

## Scripts:

- `yarn dev`: Starts the development server (Open your browser and navigate to `http:// localhost:3000` to see the application running.).
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server.
- `yarn lint`: Lints the codebase using ESLint.
- `yarn lint:fix`: Automatically fixes linting issues.
- `yarn test`: Runs the test suite.

---

## Code Style:

- We use ESLint for code linting and Prettier for code formatting.
- Follow the project's ESLint configuration to maintain consistent code style.
- Custom rules can be found in the .eslintrc.json file.
- Configuration of Prettier is available in the .prettierrc file.
- Run `yarn lint` to check for linting issues.
- Run `yarn lint:fix` to automatically fix linting issues.
  The project includes settings to streamline development in Visual Studio Code.
- Required VSCode Extensions:
  ESLint
  Prettier - Code formatter
- The .vscode/settings.json file ensures (o install these extensions, search for them in the Extensions Marketplace in VSCode.):
  Linting and formatting are applied automatically.
  Prettier formats files on save.

---

## Folder Structure:

- `src/`: Contains the source code of the application.
- `src/components/`: Contains reusable React components.
- `src/pages/`: Contains the application's pages.
- `src/styles/`: Contains global styles and theme configuration.
- `src/utils/`: Contains utility functions and helpers.
- `src/api/`: Contains API-related files.
- `src/assets/`: Contains static assets like images, fonts, etc.
- `src/tests/`: Contains unit tests for the application.
- `src/config/`: Contains configuration files.
- `src/hooks/`: Contains custom React hooks.
- `.vscode/settings.json`: VSCode settings for linting and formatting.
- `package.json`: Contains project dependencies and scripts.
- `README.md`: This file for basics documentation.
- `public/`: Contains static assets for the application.
- `tsconfig.node.json`: TypeScript configuration file for Node.js projects.
- `tsconfig.json`: TypeScript configuration file for the project.
- `eslint.config.js`: ESLint configuration file.
- `prettier.config.js`: Prettier configuration file.
- `vite.config.js`: Vite configuration file.
- `node_modules/`: Contains the project's dependencies.

---

## Environment Variables Setup

This project uses environment variables to manage specific configurations for each environment (development, production, etc.). To ensure the application works correctly, follow the steps below to configure your environment variables:

1. Copy the `.env.example` file

The repository includes an example file named `.env.example`, which contains all the required environment variables for the project.

Copy this file to a new file named `.env`:

```bash
cp .env.example .env
```

---

## Commit Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to ensure a consistent and descriptive commit history. Please follow these guidelines when making commits.

- Commit Message Format:
  Each commit message should follow this structure:

```plaintext
<type>(<scope>): <description>

[optional body]
[optional footer]
```
