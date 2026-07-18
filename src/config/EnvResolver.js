// @ts-check
const fs = require("fs");
const path = require("path");

class EnvResolver {
  /**
   * Loads the selected JSON config and applies optional CI environment overrides.
   * @returns {{ BASE_URL: string, API_URL: string, TIMEOUT: number }}
   */
  static getConfig() {
    const environment = process.env.TEST_ENV || "qa";

    // Use process.cwd() to resolve safely from the project root
    const configPath = path.resolve(
      process.cwd(),
      `src/test-data/environments/${environment}.config.json`,
    );

    if (!fs.existsSync(configPath)) {
      throw new Error(`Environment config file not found: ${configPath}`);
    }

    const fileContents = fs.readFileSync(configPath, "utf-8");
    const fileConfig = JSON.parse(fileContents);
    const timeout = Number(process.env.TEST_TIMEOUT ?? fileConfig.TIMEOUT);

    const config = {
      BASE_URL: process.env.BASE_URL ?? fileConfig.BASE_URL,
      API_URL:
        process.env.API_URL ?? fileConfig.API_URL ?? process.env.BASE_URL ?? fileConfig.BASE_URL,
      TIMEOUT: timeout,
    };

    EnvResolver.#validateConfig(config, environment);
    return config;
  }

  /**
   * Validates required URLs and timeout values before Playwright starts.
   * @param {{ BASE_URL: string, API_URL: string, TIMEOUT: number }} config
   * @param {string} environment
   * @returns {void}
   */
  static #validateConfig(config, environment) {
    for (const [name, value] of Object.entries({
      BASE_URL: config.BASE_URL,
      API_URL: config.API_URL,
    })) {
      if (!value) {
        throw new Error(`${name} is missing for environment: ${environment}`);
      }

      try {
        new URL(value);
      } catch {
        throw new Error(`${name} is not a valid URL for environment: ${environment}`);
      }
    }

    if (!Number.isFinite(config.TIMEOUT) || config.TIMEOUT <= 0) {
      throw new Error(`TIMEOUT must be a positive number for environment: ${environment}`);
    }
  }
}

module.exports = { EnvResolver };
