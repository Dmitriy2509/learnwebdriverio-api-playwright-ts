import { APIRequestContext, expect } from "@playwright/test";

export class Article {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createArticle(createArticleData) {
    const responseCreatedArticle = await this.request.post("/api/articles", {
      data: {
        article: createArticleData,
      },
    });
    return responseCreatedArticle;
  }

  async updateArticle(slug, updateArticleData) {
    const responseUpdateArticle = await this.request.put(
      `/api/articles/${slug}`,
      {
        data: {
          article: updateArticleData,
        },
      }
    );
    return responseUpdateArticle;
  }

  async deleteArticle(slug) {
    const responseDeleteArticle = await this.request.delete(
      `/api/articles/${slug}`
    );
    return responseDeleteArticle;
  }

  async searchArticleByTitleIsPresent(articleTitle) {
    const response = await this.request.get(`/api/articles`);
    const body = await response.json();
    const articles = body.articles;
    const listTitles = articles.map((article) => article.title);

    expect(response.status()).toBe(200);

    const matchedTitleArticles = listTitles.filter(
      (title) => title === articleTitle
    );

    expect(matchedTitleArticles.length).toBeGreaterThan(0);
  }

  async searchArticleByTagIsPresent(articleTag, expectedArticleTitle) {
    const response = await this.request.get(`/api/articles?tag=${articleTag}`);
    const body = await response.json();
    const articleList = body.articles;

    expect(response.status()).toBe(200);

    const actualArticleTitle = articleList.flatMap(
      (article) => article.title)[0];

    const tagListFromArticle = articleList.flatMap(
      (article) => article.tagList
    );

    const matchedTagsList = tagListFromArticle.filter(
      (tag) => tag === articleTag
    );

    expect(matchedTagsList.length).toBeGreaterThan(0);
    expect(actualArticleTitle).toBe(expectedArticleTitle);
  }
}
