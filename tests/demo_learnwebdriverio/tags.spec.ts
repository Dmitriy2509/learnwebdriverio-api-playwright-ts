import { expect } from "@playwright/test";
import { test } from "./../../fixtures/token-fixture";
import { ArticleData } from "../../data/ArticleData";
import { APIClient } from "../../app/clients/APIClient";

test(
  "TC-0013 Search Tag",
  { tag: ["@regression", "@searchByTag"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const articleUtils = new ArticleData();
    const articleBody = articleUtils.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const body = await responseCreatedArticle.json();
    const expectedArticleTitle = body.article.title;
    const createdArticleTag = body.article.tagList[0];

    const response = await client.tag.getTag(createdArticleTag);
    const bodyTag = await response.json();
    const actualBody = bodyTag.articles[0];
    const actualTitle = actualBody.title;

    expect(response.status()).toBe(200);
    expect(actualTitle).toBe(expectedArticleTitle);
  }
);
