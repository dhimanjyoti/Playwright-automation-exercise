import { faker, Faker } from "@faker-js/faker";

export const loginDataFactory = {
  /**
   * @param "Negative Data Generator"
   */
  invalidEmailFormat() {
    return {
      emailAddress: faker.random.alpha(5),
      password: faker.internet.password(),
    };
  },

  randomInvalidCombo() {
    return {
      emailAddress: faker.internet.email(),
      password: faker.internet.password(),
    };
  },

  generateRandomUser() {
    const random = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now();

    return {
      username: `user_${random}`,
      emailAddress: `test_${random}_${timestamp}@mail.com`,
    };
  },
};
