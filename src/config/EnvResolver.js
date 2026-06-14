// @ts-check
const fs = require("fs");
const path = require("path");

class EnvResolver {
  /**
   * Reads the TEST_ENV variable and loads the corresponding JSON config.
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
    return JSON.parse(fileContents);
  }
}

module.exports = { EnvResolver };
