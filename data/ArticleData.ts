import { faker } from "@faker-js/faker";

export class ArticleData {
  constructor() {}

  generateArticleBody() {
    return {
      title: faker.word.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      tagList: [faker.word.noun().toLowerCase()],
    };
  }
}
