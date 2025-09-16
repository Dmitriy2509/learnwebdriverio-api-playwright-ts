import { expect } from "@playwright/test";
import { test } from "./../../fixtures/token-fixture";
import { ArticleData } from "../../data/ArticleData";
import { APIClient } from "../../app/clients/APIClient";
import {
  contentTypeHeader,
  contentTypeHeaderValue,
} from "../../data/headers/headers";
import { SchemaClient } from "../../app/clients/SchemaClient";

test(
  "TC-0004 Create article",
  { tag: ["@regression", "@smoke", "@article"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const clientSchema = new SchemaClient();
    const articleData = new ArticleData();
    const articleBody = articleData.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const createdArticleJson = await responseCreatedArticle.json();

    expect(responseCreatedArticle.status()).toBe(200);
    await client.helperCheckRequest.verifyHeadersHasValue(
      responseCreatedArticle,
      contentTypeHeader,
      contentTypeHeaderValue
    );
    client.helperCheckRequest.verifySchema(
      clientSchema.articleSchemas.articleSchema,
      createdArticleJson
    );
  }
);

test(
  "TC-0005 Update article",
  { tag: ["@regression", "@smoke", "@article"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const articleData = new ArticleData();
    const clientSchema = new SchemaClient();
    const articleBody = articleData.generateArticleBody();
    const updatedArticleBody = articleData.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const responseJson = await responseCreatedArticle.json();
    const slug = responseJson.article.slug;

    expect(responseCreatedArticle.status()).toBe(200);

    const updatedArticleResponse = await client.article.updateArticle(
      slug,
      updatedArticleBody
    );
    const updatedArticleJson = await updatedArticleResponse.json();

    expect(updatedArticleResponse.status()).toBe(200);
    await client.helperCheckRequest.verifyHeadersHasValue(
      updatedArticleResponse,
      contentTypeHeader,
      contentTypeHeaderValue
    );
    client.helperCheckRequest.verifySchema(
      clientSchema.articleSchemas.articleSchema,
      updatedArticleJson
    );
  }
);

test(
  "TC-0006 Delete article",
  { tag: ["@regression", "@smoke", "@article"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const articleData = new ArticleData();
    const articleBody = articleData.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const responseCreatedArticleJson = await responseCreatedArticle.json();
    const slug = responseCreatedArticleJson.article.slug;

    expect(responseCreatedArticle.status()).toBe(200);

    const responseDeletedArticle = await client.article.deleteArticle(slug);

    expect(responseDeletedArticle.status()).toBe(204);
  }
);

test(
  "TC-0007 Search by title",
  { tag: ["@regression", "@smoke", "@article"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const articleData = new ArticleData();
    const articleBody = articleData.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const createdArticleJson = await responseCreatedArticle.json();
    const createdArticleTitle = createdArticleJson.article.title;

    await client.article.searchArticleByTitleIsPresent(createdArticleTitle);
  }
);

test(
  "TC-0008 Search by tag",
  { tag: ["@regression", "@smoke", "@article"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const articleData = new ArticleData();
    const articleBody = articleData.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const body = await responseCreatedArticle.json();
    const expectedArticleTitle = body.article.title;
    const createdArticleJson = await responseCreatedArticle.json();
    const createdArticleTag = createdArticleJson.article.tagList[0];

    await client.article.searchArticleByTagIsPresent(
      createdArticleTag,
      expectedArticleTitle
    );
  }
);
