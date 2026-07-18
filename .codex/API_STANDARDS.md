# Codex API Automation Standards

These rules apply to every file in `src/api/`, every API fixture, and every
test in `tests/api-hybrid/`. They supplement the repository-level `AGENTS.md`.
If the rules conflict, follow the stricter requirement.

## 1. Architecture Boundaries

- Tests must access endpoints only through controllers injected by `ApiManager`.
- Tests must not call `request.get()`, `request.post()`, `request.put()`,
  `request.patch()`, or `request.delete()` directly.
- Tests must not instantiate API controllers with `new`.
- Every controller must extend `BaseApiController` and call `super(request)`.
- Controllers own endpoint paths, HTTP methods, headers, query parameters, and
  request serialization. Tests own assertions and scenario orchestration.
- Controllers must return a raw Playwright `APIResponse` or an explicitly typed
  domain result. A controller must not hide a failed response or weaken errors.

## 2. Module and Type Safety

- Every JavaScript source and test file must start with `// @ts-check`.
- Files in `src/api/` and `tests/` use ESM imports and exports.
- Every controller constructor and method must have complete JSDoc parameter and
  return types. Use inline Playwright types such as
  `import('@playwright/test').APIResponse`.
- Avoid `any`. Define reusable payload and response typedefs when a shape is used
  by more than one method or test.
- Type checking must be runnable in CI and must fail the build on an error.

## 3. Request and Environment Configuration

- Base URLs must come from the selected environment configuration with an
  explicit environment-variable override for CI. Do not hardcode hosts in tests
  or controllers.
- UI and API base URLs must be configured independently when they differ.
- Required environment values must be validated once during startup. Throw a
  descriptive error naming missing keys before test discovery or browser launch.
- Never log credentials, tokens, cookies, complete request headers, or sensitive
  payload fields.
- Never commit `.env`, authentication state, tokens, downloaded customer data,
  traces containing secrets, or generated request logs.
- CI secrets must be exposed under the exact runtime names consumed by code.

## 4. Payload Engineering

- Use `userDataFactory` and Faker for volatile identities and mutable resources.
- Generated identifiers must remain unique across workers, retries, and parallel
  CI jobs. Include sufficient randomness; do not rely on timestamps alone.
- Keep frozen request templates in `src/test-data/` and merge them with generated
  fields. Do not mutate imported JSON fixtures.
- Negative tests must omit or corrupt only the field relevant to the scenario.
- Never use a shared production account for destructive API scenarios.

## 5. Response and Contract Assertions

Every API test must validate all relevant protocol and application layers:

1. Assert the real HTTP status with `response.status()`.
2. Assert the expected content type before parsing JSON.
3. Parse the body once and assert the application-level `responseCode` when the
   service contract exposes it.
4. Assert the frozen expected message from `src/constants/message.js`.
5. Validate required fields, types, and important domain values.
6. Validate response schema for stable contracts; reject missing required fields.

- Status values must come from the frozen `HTTP_STATUS` constant.
- Do not treat an application-level `responseCode` as the HTTP transport status.
- Do not use weak assertions such as only `toBeDefined()` when exact shape or
  value assertions are available.
- Business-critical assertions must be hard assertions. Soft assertions are only
  for independent, non-blocking metadata checks.

## 6. State Isolation and Cleanup

- A test that creates or mutates data must register cleanup before performing the
  mutation, so cleanup still runs after an assertion or orchestration failure.
- Prefer fixture teardown or `test.afterEach` for cleanup. Use backend controllers
  rather than UI cleanup whenever an API is available.
- Cleanup must be idempotent and scoped to resources created by the current test.
- Cleanup failures must be surfaced; do not silently swallow them with empty
  `catch` blocks.
- Tests must not depend on execution order or state created by another test.
- Retries must be safe: a retried test must generate new isolated data or clean up
  the previous attempt deterministically.

## 7. Determinism and Reliability

- Do not use hard sleeps, polling loops without a deadline, conditional pass
  paths, or `try/catch` fallbacks that conceal failures.
- Use Playwright request timeouts and event-driven conditions with bounded limits.
- Do not retry assertions that represent deterministic contract failures.
- A test may retry transient infrastructure failures only through centrally
  configured Playwright retry policy.
- Tests must remain safe under the configured worker count and parallel CI runs.

## 8. Mocking

- Store reusable mock responses under `src/test-data/mockResponses/`.
- Mock at a documented boundary and assert the request that triggered the mock.
- Do not mock the endpoint whose real contract the test claims to validate.
- Mock payloads must conform to the same schema used for real-response validation.

## 9. Verification Gate

After changing an API controller or API test:

1. Run the specific spec with
   `npx playwright test tests/api-hybrid/<name>.api.spec.js`.
2. Run `npm run test:api` after shared controller, fixture, factory, constant, or
   environment changes.
3. Run type checking and linting once project scripts exist.
4. Inspect the response status and body on failure before changing assertions.
5. Do not mark a failing test with unconditional `test.fail()`, `test.skip()`, or
   weakened assertions to make the pipeline green.

## 10. Review Checklist

Before considering API work production-ready, verify:

- controller and fixture boundaries are preserved;
- all files have `// @ts-check` and complete JSDoc;
- payloads are unique and parallel-safe;
- HTTP status, content type, body code, message, and schema are asserted;
- every mutation has failure-safe teardown;
- no secret or authenticated state is tracked or logged;
- CI runs the API suite on pull requests and protected-branch pushes;
- no ignored, skipped, expected-failure, or debug-only test hides a defect.
