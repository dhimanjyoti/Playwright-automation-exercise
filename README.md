# Playwright UI and API Automation Framework

This project automatically checks the
[Automation Exercise](https://automationexercise.com) website.

Imagine that we give a robot a list of jobs:

1. Open the website.
2. Click **Signup / Login**.
3. Enter an email and password.
4. Click **Login**.
5. Check that the correct username appears.

Playwright is the robot. The JavaScript files in this repository are the
instructions given to that robot.

The project can check two parts of the application:

- **UI tests** use a real browser and behave like a user.
- **API tests** send requests directly to the application's backend.

The framework keeps test instructions, browser controls, test data, and
configuration in separate places. This makes the project easier to understand,
reuse, and maintain.

## Table of Contents

1. [The Big Picture](#the-big-picture)
2. [How One UI Test Works](#how-one-ui-test-works)
3. [How One API Test Works](#how-one-api-test-works)
4. [Project Folder Map](#project-folder-map)
5. [Important Framework Files](#important-framework-files)
6. [Installation](#installation)
7. [Environment Setup](#environment-setup)
8. [Running Tests](#running-tests)
9. [Authentication](#authentication)
10. [Test Data](#test-data)
11. [Reports and Debugging](#reports-and-debugging)
12. [How to Write a UI Test](#how-to-write-a-ui-test)
13. [How to Write an API Test](#how-to-write-an-api-test)
14. [Framework Rules](#framework-rules)
15. [GitHub Actions](#github-actions)
16. [Known Limitations](#known-limitations)
17. [Common Problems](#common-problems)

## The Big Picture

The framework is split into layers. Each layer has one job.

```text
Test file
   |
   | asks for a ready-made helper
   v
Fixture
   |
   | gives the test its managers and data tools
   v
POManager or ApiManager
   |
   | chooses the correct page or API controller
   v
Page Object or API Controller
   |
   | performs browser actions or sends an API request
   v
Automation Exercise application
```

Here is a simple way to remember every layer:

| Layer | Simple meaning | Example |
| --- | --- | --- |
| Test | The job we want to check | "Can the user log in?" |
| Fixture | A delivery box containing helpers | Gives the test `pom`, `api`, and `factory` |
| Manager | A toolbox holding related helpers | `POManager`, `ApiManager` |
| Page Object | Knows how to use one screen | `LoginPage` |
| API Controller | Knows how to call one API group | `AuthApiController` |
| Data Factory | Creates safe test data | Random email and password |
| Constants | Stores expected fixed words | `"User exists!"` |
| Configuration | Decides where and how tests run | QA URL and timeout |

The important rule is that a test says **what** it wants to do. Page Objects and
API Controllers know **how** to do it.

## How One UI Test Works

This is the login journey in plain language:

```text
login.noauth.spec.js
        |
        | uses pom.loginPage
        v
POManager
        |
        | creates LoginPage only when it is needed
        v
LoginPage
        |
        | fills email, fills password, clicks Login
        v
Browser page
        |
        | shows "Logged in as <username>"
        v
The test checks the username
```

A simplified test looks like this:

```javascript
test("user can log in", async ({ pom, factory }) => {
  const user = factory.getValidLoginCredentials();

  await pom.basePage.navigateToAutomationExcercise();
  await pom.loginPage.navigateToLoginPage();
  await pom.loginPage.submitLoginDetails(
    user.emailAddress,
    user.password,
  );

  const actualUsername = await pom.basePage.getLoggedInUsername();
  expect(actualUsername).toEqual(user.userName);
});
```

What each line means:

| Code | Meaning |
| --- | --- |
| `test(...)` | Create one test job. |
| `{ pom, factory }` | Ask the fixture for the page toolbox and data maker. |
| `getValidLoginCredentials()` | Read the test account from environment variables. |
| `navigateToAutomationExcercise()` | Open the website. |
| `navigateToLoginPage()` | Open the login screen. |
| `submitLoginDetails(...)` | Fill and submit the login form. |
| `getLoggedInUsername()` | Read the displayed username. |
| `expect(...)` | Compare the real result with the expected result. |

Notice that the test does not contain selectors such as `#login-button`. Those
details belong inside `LoginPage`.

## How One API Test Works

An API test does not click buttons. It talks directly to the backend.

```text
verifyLoginValid.api.spec.js
        |
        | uses api.auth
        v
ApiManager
        |
        | provides AuthApiController
        v
AuthApiController
        |
        | sends POST /api/verifyLogin
        v
Backend response
        |
        | returns a status and JSON body
        v
The test checks the response
```

A simplified API test looks like this:

```javascript
test("valid credentials are accepted", async ({ api }) => {
  const response = await api.auth.verifyLogin(email, password);
  const body = await response.json();

  expect(response.status()).toBe(HTTP_STATUS.OK);
  expect(body.responseCode).toBe(HTTP_STATUS.OK);
  expect(body.message).toEqual(API_MESSAGES.USER_EXISTS);
});
```

The real HTTP status and the status-like value inside the JSON body are two
different things. Production-grade API tests should check both.

## Project Folder Map

```text
Automation-Practice/
|
|-- .auth/
|   `-- user.json                 Saved browser login state
|
|-- .codex/
|   |-- API_STANDARDS.md          API rules for Codex
|   |-- pom-manifest.md           Map of Page Objects and API Controllers
|   `-- config.toml               Local Codex MCP configuration
|
|-- .github/workflows/
|   `-- playwright.yml            GitHub Actions pipeline
|
|-- scripts/
|   `-- generate-manifest.js      Rebuilds the agent framework map
|
|-- src/
|   |-- api/                      Backend request controllers
|   |-- config/                   Environment resolver
|   |-- constants/                Expected messages and status values
|   |-- fixtures/                 Shared Playwright fixtures
|   |-- pages/                    Browser Page Objects
|   |-- test-data/                JSON templates and environment files
|   `-- utils/                    Data, form, network, and Excel helpers
|
|-- tests/
|   |-- api/                      API tests grouped by business domain
|   |-- setup/                    Authentication state setup
|   |-- ui/                       UI tests grouped by business domain
|   |-- visual/                   Screenshot comparison tests
|   `-- auth.setup.js             Creates reusable authenticated state
|
|-- .env                          Local secrets; never commit this file
|-- AGENTS.md                     Framework rules for Codex
|-- package.json                  Commands and dependencies
|-- playwright.config.js          Playwright projects and global settings
`-- README.md                     This guide
```

## Important Framework Files

### `playwright.config.js`

This is the main control panel.

It decides:

- where tests live;
- how long a test may run;
- how many workers run in parallel;
- how many retries are allowed;
- which reports are created;
- when screenshots, videos, and traces are saved;
- which Playwright project runs each test;
- whether a test receives saved login state.

The configured projects are:

| Project | Job |
| --- | --- |
| `api` | Runs files ending with `.api.spec.js`. |
| `setup` | Runs `auth.setup.js` and saves login state. |
| `chromium` | Runs authenticated Chrome UI tests. |
| `chromium-noauth` | Runs guest tests ending with `.noauth.spec.js`. |

### `src/fixtures/baseFixture.js`

A fixture prepares tools before a test starts.

This fixture can provide:

| Fixture name | What the test receives |
| --- | --- |
| `pom` | A `POManager` for browser pages. |
| `api` | An `ApiManager` for backend requests. |
| `data` | Static JSON test data. |
| `factory` | Dynamic data creation functions. |

Because these tools are injected, test files do not create Page Objects or API
Controllers themselves.

### `src/pages/POManager.js`

`POManager` is the Page Object toolbox.

For example:

```javascript
pom.loginPage
pom.registrationPage
pom.cartPage
pom.checkoutPage
```

The manager creates a Page Object only when a test asks for it. This is called
lazy loading.

### `src/api/ApiManager.js`

`ApiManager` is the API toolbox.

```javascript
api.auth
api.account
api.product
```

Each property points to a controller responsible for one group of endpoints.

### `src/pages/BasePage.js`

`BasePage` stores browser actions shared by several screens, such as:

- opening the website;
- reading the logged-in username;
- logging out;
- deleting an account;
- clicking a common Continue button.

Other Page Objects extend `BasePage`, so they can reuse these common actions.

### `src/api/BaseApiController.js`

`BaseApiController` stores the shared Playwright API request context. Every API
controller extends it.

### `src/utils/user-data-factory.js`

The data factory creates data needed by tests.

It can:

- read valid login credentials from environment variables;
- make an invalid email format;
- make random invalid credentials;
- generate a unique registration payload;
- generate product-review data.

Faker makes new values so parallel tests are less likely to fight over the same
email address.

### `src/constants/message.js`

This file stores fixed expected messages in one place.

Instead of writing the same text in many tests:

```javascript
expect(message).toEqual("User exists!");
```

the test uses:

```javascript
expect(message).toEqual(API_MESSAGES.USER_EXISTS);
```

If the expected text changes, it can be updated in one file.

### `src/config/EnvResolver.js`

The resolver reads `TEST_ENV` and selects a matching JSON file:

```text
src/test-data/environments/qa.config.json
src/test-data/environments/production.config.json
```

If `TEST_ENV` is missing, the framework uses `qa`.

## Installation

### 1. Install required tools

Install:

- Node.js 20 or newer;
- Git;
- Java 11 or newer if you want to generate Allure reports.

Check the installations:

```bash
node --version
npm --version
git --version
java --version
```

### 2. Clone the repository

```bash
git clone <repository-url>
cd Automation-Practice
```

### 3. Install exact Node.js dependencies

```bash
npm ci
```

`npm ci` uses `package-lock.json`, giving every machine the same dependency
versions.

### 4. Install the Chromium browser

```bash
npx playwright install chromium
```

For a Linux CI machine that also needs operating-system packages:

```bash
npx playwright install --with-deps chromium
```

## Environment Setup

Create a `.env` file in the project root:

```env
USER_EMAIL=registered-email@example.com
APP_USERNAME=DisplayedUserName
PASSWORD=account-password
```

All three values must belong to the same Automation Exercise account.

| Variable | Meaning |
| --- | --- |
| `USER_EMAIL` | Email used to log in. |
| `APP_USERNAME` | Name shown after successful login. |
| `PASSWORD` | Password for the same account. |

Do not add quotation marks unless they are part of the real value.

Do not commit `.env`. It contains secrets.

The local `.env` file is loaded only when `CI` is not set. GitHub Actions gets
the same values from repository secrets instead.

### GitHub repository secrets

Create these secrets under:

```text
Repository Settings > Secrets and variables > Actions
```

| GitHub secret | Runtime variable |
| --- | --- |
| `BASE_URL` | `BASE_URL` |
| `USEREMAIL` | `USER_EMAIL` |
| `APP_USERNAME` | `APP_USERNAME` |
| `PASSWORD` | `PASSWORD` |

The workflow performs the `USEREMAIL` to `USER_EMAIL` mapping.

## Running Tests

Run commands from the project root.

### Run everything

```bash
npm run test:all
```

This discovers API tests, authentication setup, authenticated UI tests, and
guest UI tests.

### Run authenticated UI tests

```bash
npm run test:ui
```

The `chromium` project first depends on the authentication setup project.

### Run API tests

```bash
npm run test:api
```

### Run guest tests

```bash
npm run test:noauth
```

### Run visual tests

```bash
npm run test:visual
```

Visual tests use their own configuration and run with one Chromium worker.

To intentionally replace the visual baseline images:

```bash
npm run test:visual-update
```

### Run one file

```bash
npx playwright test tests/ui/auth/login.noauth.spec.js
```

### Run one test by its title

```bash
npx playwright test -g "user is able to login"
```

### Open UI mode

```bash
npm run test:ui-mode
```

UI mode shows tests in an interactive Playwright window.

### Open debug mode

```bash
npm run test:debug
```

Debug mode pauses execution and opens the Playwright Inspector.

### Select an environment

QA is the default:

```bash
npm run test:all
```

Production configuration:

```bash
npm run test:prod-all
```

Use production commands carefully because tests can create, update, or delete
application data.

## Authentication

Some tests need a user who is already logged in. Logging in before every test
would be slow, so the framework saves the browser session.

The flow is:

```text
auth.setup.js
   |
   | logs in with USER_EMAIL and PASSWORD
   v
.auth/user.json
   |
   | stores browser cookies and local storage
   v
chromium project
   |
   | gives the saved session to authenticated tests
   v
Test starts already logged in
```

`user.json` is generated state, not source code. It may contain reusable login
cookies and must not be committed.

### Tests that must not be logged in

A login, registration, or guest checkout test needs a clean browser. Name that
file like this:

```text
feature-name.noauth.spec.js
```

Playwright automatically sends it to the `chromium-noauth` project.

Example:

```text
login.noauth.spec.js
```

Do not manually clear cookies inside the test. Use the filename convention.

## Test Data

The framework uses two kinds of data.

### Static data

Static data stays the same and lives in JSON files under `src/test-data/`.

Examples:

- registration address templates;
- payment form data;
- contact form data;
- QA and production URLs.

### Dynamic data

Dynamic data changes for each test and comes from Faker through
`user-data-factory.js`.

Examples:

- a new email address;
- a new username;
- a random invalid password;
- a unique API registration payload.

Use static data for stable templates. Use dynamic data for values that must be
unique.

## Reports and Debugging

### Playwright HTML report

After a test run, open the report:

```bash
npx playwright show-report
```

On failure, the framework can save:

- a screenshot;
- a video;
- a trace on the first retry;
- an error context file.

### Trace viewer

Open a saved trace:

```bash
npx playwright show-trace path/to/trace.zip
```

A trace shows browser actions, page snapshots, console messages, and network
activity.

### Allure report

Run tests first, then generate the report:

```bash
npm run report:clean
npm run test:all
npm run report:generate
npm run report:open
```

Java is required for Allure command-line report generation.

## How to Write a UI Test

### Step 1: Choose or create a Page Object

Put browser selectors and actions under `src/pages/`.

Every new Page Object must:

- start with `// @ts-check`;
- use ESM `import` and `export`;
- extend `BasePage`;
- call `super(page)` in its constructor;
- include JSDoc types for its methods.

Example:

```javascript
// @ts-check
import { BasePage } from "../BasePage.js";

export class ExamplePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.saveButton = page.getByRole("button", { name: "Save" });
  }

  /**
   * @returns {Promise<void>}
   */
  async save() {
    await this.saveButton.click();
  }
}
```

### Step 2: Add it to `POManager`

The manager should create and return the Page Object. Tests must not use
`new ExamplePage(page)` directly.

### Step 3: Use the Page Object in a test

```javascript
// @ts-check
import { test, expect } from "../../src/fixtures/baseFixture.js";

test("save works", async ({ pom }) => {
  await pom.examplePage.save();
  await expect(pom.examplePage.successMessage).toBeVisible();
});
```

### Step 4: Run that test file

```bash
npx playwright test tests/path/example.spec.js
```

## How to Write an API Test

### Step 1: Choose or create an API Controller

Controllers live under `src/api/`. A controller owns the endpoint path, HTTP
method, and request body.

```javascript
// @ts-check
import { BaseApiController } from "./BaseApiController.js";

export class ExampleApiController extends BaseApiController {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request);
  }

  /**
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async getExample() {
    return await this.request.get("/api/example");
  }
}
```

### Step 2: Add it to `ApiManager`

Tests receive controllers through `api`. They must not instantiate controllers
or send raw requests themselves.

### Step 3: Write the API test

API test filenames must end with:

```text
.api.spec.js
```

Check the transport status, response type, body status, expected message, and
important body fields.

### Step 4: Clean up created data

If a test creates or changes an account, register cleanup before the mutation.
Use fixture teardown, `afterEach`, or `afterAll` so cleanup still runs when a test
fails halfway through.

### Step 5: Run the API test

```bash
npx playwright test tests/api/products/product.api.spec.js
```

The complete API rules are in `.codex/API_STANDARDS.md`.

## Framework Rules

### Do

- Keep selectors and browser actions inside Page Objects.
- Use `POManager` through the `pom` fixture.
- Keep endpoint calls inside API Controllers.
- Use `ApiManager` through the `api` fixture.
- Use Faker for unique mutable data.
- Use frozen constants for expected messages.
- Use web-first Playwright assertions.
- Use event-driven waits.
- Clean up every created or changed resource.
- Make tests safe for parallel workers and retries.
- Start source and test files with `// @ts-check`.
- Add explicit JSDoc parameter and return types.

### Do not

- Put `page.locator()` or `page.getBy*()` calls in test files.
- Create Page Objects or API Controllers directly inside tests.
- Use `page.waitForTimeout()` or other hard sleeps.
- Inject JavaScript to change application behavior.
- Use `dispatchEvent()` to fake a user click.
- Add conditional UI fallback paths that hide inconsistent behavior.
- Hardcode volatile emails, names, or passwords.
- Hardcode expected messages in assertions.
- Commit `.env`, `.auth/`, reports, traces, or secret-bearing logs.
- Mark a broken test with unconditional `test.fail()` or `test.skip()` merely to
  make the pipeline green.

## GitHub Actions

The workflow is stored at:

```text
.github/workflows/playwright.yml
```

When code is pushed to `main`, GitHub Actions:

1. Checks out the repository.
2. Installs Node.js.
3. Restores or installs Playwright browsers.
4. Installs project dependencies with `npm ci`.
5. Runs the Playwright suite.
6. Uploads the HTML report.

The CI machine uses two Playwright workers and one retry.

## Known Limitations

This section describes the current repository honestly. These items should be
fixed before calling the framework fully production-grade.

1. The repository still needs enforced lint and type-check commands in CI.

Do not hide these limitations in documentation or weaken tests to avoid them.
Fix the implementation and then remove the matching item from this list.

## Common Problems

### Login returns 400 or the UI never shows the username

Check that the runtime environment contains:

```text
USER_EMAIL
APP_USERNAME
PASSWORD
```

The email, username, and password must belong to the same account.

### Authenticated tests do not run

Check the `setup` project first. If `tests/setup/auth.setup.js` fails, tests depending on the
saved authentication state will not run.

### A locator times out

Check the screenshot, video, and trace. A timeout often means the expected page
state was never reached, not that the timeout is too short.

### The same email already exists

Use the data factory to generate a unique email and make sure failed tests clean
up their created accounts.

## Technology Used

| Tool | Why it is used |
| --- | --- |
| Playwright | Controls browsers and sends API requests. |
| JavaScript | Describes framework and test behavior. |
| Node.js | Runs the JavaScript project. |
| Faker | Creates dynamic test data. |
| Allure | Creates detailed test reports. |
| XLSX | Writes product data to Excel files. |
| GitHub Actions | Runs tests in CI after a push. |
| Codex manifest | Gives coding agents a small architecture map. |

## Final Memory Trick

If the framework feels complicated, remember this sentence:

> The test asks for a toolbox, chooses a helper, performs a job, and checks the
> result.

For UI testing:

```text
test -> fixture -> POManager -> Page Object -> browser -> assertion
```

For API testing:

```text
test -> fixture -> ApiManager -> API Controller -> backend -> assertion
```

That is the main logic of the entire framework.
