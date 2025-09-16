import { faker } from "@faker-js/faker";

export class UserData {
  constructor() {}

  generateLogInBody() {
    return {
      username: faker.internet
        .username()
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
    };
  }

  generateUpdateBody() {
    return {
      email: faker.number.bigInt(7) + faker.internet.email().toLowerCase(),
      username:
        faker.internet
          .username()
          .replace(/[^a-zA-Z]/g, "")
          .toLowerCase() + faker.number.bigInt(90664),
      password: faker.internet.password(),
      bio: faker.internet.displayName() + faker.internet.httpStatusCode(),
      image: faker.image.url(),
    };
  }
}
