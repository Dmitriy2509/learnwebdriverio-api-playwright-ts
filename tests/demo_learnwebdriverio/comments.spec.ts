import { test } from "./../../fixtures/token-fixture";
import { ArticleData } from "../../data/ArticleData";
import { CommentsData } from "../../data/CommentsData";
import { expect } from "@playwright/test";
import { APIClient } from "../../app/clients/APIClient";
import {
  contentTypeHeader,
  contentTypeHeaderValue,
} from "../../data/headers/headers";
import { SchemaClient } from "../../app/clients/SchemaClient";

test(
  "TC-0011 Add comment to article",
  { tag: ["@regression", "@comment"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const clientSchema = new SchemaClient();
    const articleUtils = new ArticleData();
    const comments = new CommentsData();
    const commentBody = comments.getCommentsBody();
    const articleBody = articleUtils.generateArticleBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const responseJson = await responseCreatedArticle.json();
    const slug = responseJson.article.slug;

    expect(responseCreatedArticle.status()).toBe(200);

    const responseAddComment = await client.comment.addComment(
      slug,
      commentBody
    );
    const responseAddCommentJson = await responseAddComment.json();

    expect(responseAddComment.status()).toBe(200);
    await client.helperCheckRequest.verifyHeadersHasValue(
      responseAddComment,
      contentTypeHeader,
      contentTypeHeaderValue
    );
    client.helperCheckRequest.verifySchema(
      clientSchema.commentSchemas.commentSchema,
      responseAddCommentJson
    );
  }
);

test(
  "TC-0012 Remove comment from article",
  { tag: ["@regression", "@comment"] },
  async ({ request }) => {
    const client = new APIClient(request);
    const comments = new CommentsData();
    const articleData = new ArticleData();
    const articleBody = articleData.generateArticleBody();
    const commentBody = comments.getCommentsBody();

    const responseCreatedArticle = await client.article.createArticle(
      articleBody
    );
    const responseCreatedArticleJson = await responseCreatedArticle.json();
    const slug = responseCreatedArticleJson.article.slug;

    const responseAddComment = await client.comment.addComment(
      slug,
      commentBody
    );
    const responseAddCommentJson = await responseAddComment.json();
    const commentId = responseAddCommentJson.comment.id;

    const responseDeleteComment = await client.comment.deleteComment(
      slug,
      commentId
    );

    expect(responseDeleteComment.status()).toBe(204);
    await client.helperCheckRequest.verifyHeadersHasValue(
      responseAddComment,
      contentTypeHeader,
      contentTypeHeaderValue
    );
  }
);
