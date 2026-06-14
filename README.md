# Playwright Automation Framework

A scalable, decoupled End-to-End (E2E) and API test automation framework built with Playwright. To test the Automation Exercise platform, this repository focuses on execution stability, dynamic data generation, enterprise-grade maintainability, and AI-Assisted Development optimization.

---

## Table of Contents

1. [Framework Architecture](#-framework-architecture)
2. [Folder Structure](#-folder-structure)
3. [Prerequisites & Local Setup](#-prerequisites--local-setup)
4. [Environment Configuration](#-environment-configuration)
5. [Test Execution Guide](#-test-execution-guide)
6. [Allure Reporting Lifecycle](#-allure-reporting-lifecycle)
7. [Core Stability Features](#-core-stability-features)
8. [Writing Tests (Best Practices)](#-writing-tests-best-practices)

---

## Framework Architecture

This framework abandons hardcoded scripts in favor of layered, scalable design patterns:

**Page Object Model (POM)**: UI interactions and locators are strictly encapsulated in page classes (e.g., `LoginPage.js`).

**Dependency Injection (Lazy Loading)**: POManager.js handles the instantiation of all page objects. Pages are only loaded into memory when explicitly called, reducing test overhead.

**Hybrid Testing**: Capable of running both UI workflows and direct RESTful API tests.

**Hybrid Module System**: Uses ES Modules (ESM) (import/export) for modern source code and test files, while utilizing CommonJS (`require`) for root-level Playwright and environment configurations.

**Dynamic Data Generation**: Combines static JSON templates with `Faker.js` (userDataFactory) to guarantee unique payloads and prevent data collisions.

**Automated State Routing**: Global authentication is managed dynamically. Guest flows automatically bypass setup routines based on strict file-naming conventions (`.noauth.spec.js`).

---

## Folder Structure

```text

PLAYWRIGHT_AUTOMATION_JS/
├── .auth/                  # Stores saved browser sessions (e.g., login states)
├── .claude/                # AI Context shielding (Auto-generated POM manifests)
├── .github/workflows/      # CI/CD pipeline definitions
├── scripts/                # Framework maintenance scripts (e.g., generate-manifest.js)
├── src/
│   ├── api/                # API Controllers bypassing the UI
│   ├── config/             # EnvResolver.js to handle dynamic environments
│   ├── constants/          # message.js for frozen static strings/assertions
│   ├── fixtures/           # Custom Playwright fixtures (e.g., injecting POManager)
│   ├── pages/              # Encapsulated Page Object Models
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── BasePage.js     # Abstract blueprint for common UI actions
│   │   └── POManager.js    # Centralized Object Manager (Lazy Loader)
│   ├── test-data/          # Static JSON payloads (e.g., QA/Prod URLs)
│   └── utils/              # Helper functions (networkInterceptor, Data Factory)
├── tests/
│   ├── api-hybrid/         # Backend API tests
│   ├── core-flows/         # Primary E2E UI test flows
│   ├── shopping/           # Cart and Checkout tests
│   ├── visual/             # Visual regression tests
│   └── auth.setup.js       # Global authentication setup routine
├── CLAUDE.md               # Strict LLM boundaries and context rules
└── playwright.config.js    # Global execution definitions


```

# Prerequisites & Local Setup

Before running the framework locally, ensure the following tools are installed:

| Tool                | Required Version |
| ------------------- | ---------------- |
| Node.js             | v18+             |
| Java SDK            | v11+             |
| Playwright Browsers | Latest           |

> Java is required for Allure report generation.

---

## Installation Steps

### Clone Repository

```bash
git clone <repository-url>
cd PLAYWRIGHT_AUTOMATION_JS
```

---

### Install Dependencies

```bash
npm install
```

---

### Install Playwright Browsers

```bash
npx playwright install
```

---

# Environment Configuration

The framework supports dynamic environment routing (QA, Production, etc.).

## Create `.env` File

Add a `.env` file in the project root:

```env
USER_EMAIL="your-test-email@test.com"
APP_USERNAME="TestUser"
PASSWORD="SecurePassword123"
```

---

## Environment Resolver

Environment-specific configurations are maintained under:

```text
src/test-data/environments/
```

`EnvResolver.js` automatically selects the correct environment based on CLI parameters.

Default environment:

```text
qa
```

---

# Test Execution Guide

All executions are controlled using NPM scripts.

| Test Type      | Command                | Description                            |
| -------------- | ---------------------- | -------------------------------------- |
| Run All Tests  | `npm run test:all`     | Executes API, setup, and UI tests      |
| UI Tests Only  | `npm run test:ui`      | Runs E2E tests across browsers         |
| API Tests Only | `npm run test:api`     | Executes backend API tests             |
| UI Mode        | `npm run test:ui-mode` | Opens Playwright interactive dashboard |
| Debug Mode     | `npm run test:debug`   | Launches Playwright Inspector 
| Generate AI MAP| `npm run manifest:generate` | Builds the lightweight POM dictionary for Claude       |

---

# Allure Reporting Lifecycle

The framework uses **Allure Report** for enterprise-level reporting and analytics.

## Step 1: Clean Previous Reports

```bash
npm run report:clean
```

---

## Step 2: Execute Tests

```bash
npm run test:ui
```

---

## Step 3: Generate & Open Reports

```bash
npm run report:generate
npm run report:open
```

---

# Core Stability Features

The framework includes several advanced engineering solutions to reduce flaky tests.

---

## Network Interception

Implemented in:
networkInterceptor.js

Blocks unnecessary third-party resources such as:

- Google Ads
- Analytics
- Marketing trackers

Benefits:

- Faster page loads
- Improved stability
- Reduced element interception issues

---

## Form Event Capture

Implemented in:

ContactUsPage.js

Uses:

```js
e.preventDefault();
```

to prevent aggressive double-submit race conditions.

---

## Advanced Label Targeting

Uses Playwright’s powerful `:has()` selector:

```js
label: has(input[(value = "Mr")]);
```

Useful for handling:

- Hidden inputs
- Styled radio buttons
- Complex DOM structures

---

# Writing Tests (Best Practices)

When contributing to this framework, follow these standards carefully.

---

## Never Use Raw Locators in Tests

Avoid:

```js
page.locator("#email");
```

Use Page Object methods instead.

---

## Always Use `POManager`

Do not instantiate page classes directly.

Preferred:

```js
await pom.loginPage.submitLoginDetails();
```

---

## Use Data Factory for Dynamic Users

Always generate unique users using:

```js
userDataFactory;
```

Prevents:

- Duplicate email failures
- Shared-state conflicts
- Parallel execution issues

---

## Use Frozen Constants for Assertions

Avoid hardcoded assertions:

```js
expect(message).toBe("Account Created");
```

Preferred:

```js
SUCCESS_MESSAGES.ACCOUNT_CREATED;
```

# Contribution Guidelines

1. Create feature branches
2. Follow framework conventions
3. Keep Page Objects clean and reusable
4. Avoid duplicated locators
5. Submit PRs with clear descriptions

---

# Tech Stack

| Technology     | Purpose       |
| -------------- | ------------- |
| Playwright     | UI Automation |
| Node.js        | Runtime       |
| Faker.js       | Dynamic Data  |
| Allure Report  | Reporting     |
| GitHub Actions | CI/CD         |
| CommonJS       | Module System |

---
