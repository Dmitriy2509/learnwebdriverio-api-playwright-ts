import { faker } from "@faker-js/faker";

export class CommentsData {
  constructor() {}

  getCommentsBody() {
    return {
      body: faker.lorem.sentence(),
    };
  }
}
