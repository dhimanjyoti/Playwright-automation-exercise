// @ts-check
import { faker } from "@faker-js/faker";

import signUpTemplateData from "../test-data/auth/registrationData.json" with { type: "json" };

export const userDataFactory = {
  /**
   * Retrieves valid login credentials from the environment variables.
   * @returns {{ emailAddress: string, password: string, userName: string }}
   */
  getValidLoginCredentials() {
    return {
      emailAddress: process.env.USER_EMAIL ?? "",
      password: process.env.PASSWORD ?? "",
      userName: process.env.APP_USERNAME ?? "",
    };
  },

  /**
   * Generates login credentials with an invalid email format.
   * @returns {{ emailAddress: string, password: string }}
   */
  generateInvalidEmailFormat() {
    return {
      emailAddress: faker.string.alpha(5), // e.g. "abcde" (no @ symbol)
      password: faker.internet.password(),
    };
  },

  /**
   * Generates a completely random (unregistered) email and password combination.
   * @returns {{ emailAddress: string, password: string }}
   */
  generateRandomInvalidCombo() {
    return {
      emailAddress: faker.internet.email(),
      password: faker.internet.password(),
    };
  },

  /**
   * Generates a fully randomized API payload for POST /api/createAccount.
   * Every field is synthesized via Faker to guarantee isolation across parallel runs.
   * @returns {{ name: string, email: string, password: string, title: string, birth_date: number, birth_month: number, birth_year: number, firstname: string, lastname: string, company: string, address1: string, address2: string, country: string, zipcode: string, state: string, city: string, mobile_number: string }}
   */
  generateApiRegistrationPayload() {
    const randomSuffix = faker.string.alphanumeric(6);
    return {
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: `api_${randomSuffix}_${Date.now()}@testmail.com`,
      password: faker.internet.password({ length: 10 }),
      title: faker.helpers.arrayElement(["Mr", "Mrs"]),
      birth_date: faker.number.int({ min: 1, max: 28 }),
      birth_month: faker.number.int({ min: 1, max: 12 }),
      birth_year: faker.number.int({ min: 1960, max: 2000 }),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: "United States",
      zipcode: faker.location.zipCode("#####"),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.string.numeric(10),
    };
  },

  /**
   * Generates a randomized payload for the product review submission form.
   * @returns {{ name: string, email: string, review: string }}
   */
  generateReviewPayload() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      review: faker.lorem.sentences(2),
    };
  },

  /**
   * Generates a unique user payload for fresh registration tests.
   * Merges static template data with dynamic Faker data to avoid duplicate collisions.
   * * @param {"MALE_USER" | "FEMALE_USER"} gender
   * @returns {{ username: string, emailAddress: string, password: string, accountInfo: any, addressInfo: any }}
   */
  generateNewRegistrationUser(gender = "MALE_USER") {
    const baseTemplate = signUpTemplateData[gender];

    const randomSuffix = faker.string.alphanumeric(5);
    const uniqueEmail = `test_${randomSuffix}_${Date.now()}@mail.com`;
    const envPassword = process.env.PASSWORD ?? "Default@123";

    return {
      username: `${baseTemplate.USERNAME}_${randomSuffix}`,
      emailAddress: uniqueEmail,
      password: envPassword,

      accountInfo: {
        ...baseTemplate.ACCOUNT_INFO,
        PASSWORD: envPassword,
      },

      addressInfo: baseTemplate.ADDRESS_INFO,
    };
  },
};
