import { expect } from "@playwright/test";
import { Article } from "../../app/controllers/Article.controller";
import { ArticleData } from "../../data/ArticleData";
import { test } from "./../../fixtures/token-fixture";
import { APIClient } from "../../app/clients/APIClient";

test(
  "TC-0009 Add article to favorite",
  { tag: ["@regression", "@favoriteArticle"] },
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

    const response = await client.favoriteArticle.addArticleToFavorite(slug);
    const body = await response.json();
    const isFavorite = body.article.favorited;

    expect(response.status()).toBe(200);
    expect(isFavorite).toBe(true);
  }
);

test(
  "TC-0010 Remove article from favorite",
  { tag: ["@regression", "@favoriteArticle"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const articleData = new ArticleData();
    const articleBody = articleData.generateArticleBody();
    const article = new Article(request);

    const responseCreatedArticle = await article.createArticle(articleBody);
    const responseCreatedArticleJson = await responseCreatedArticle.json();
    const slug = responseCreatedArticleJson.article.slug;

    expect(responseCreatedArticle.status()).toBe(200);

    const responseArticleToFavorite = await client.favoriteArticle.addArticleToFavorite(slug);
    const body = await responseArticleToFavorite.json();
    const isFavorite = body.article.favorited;

    expect(responseArticleToFavorite.status()).toBe(200);
    expect(isFavorite).toBe(true);

    const responseDeleteFromFavorite =
      await client.favoriteArticle.deleteArticleFromFavorite(slug);
    const bodyDelete = await responseDeleteFromFavorite.json();

    expect(responseDeleteFromFavorite.status()).toBe(200);
    expect(bodyDelete.article.favorited).toBe(false);
  }
);
