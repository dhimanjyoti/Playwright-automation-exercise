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
};
