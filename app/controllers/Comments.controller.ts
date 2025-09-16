import { APIRequestContext } from "@playwright/test";

export class Comments {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addComment(slug, commentBody) {
    const responseAddComment = await this.request.post(
      `/api/articles/${slug}/comments`,
      {
        data: commentBody,
      }
    );
    return responseAddComment;
  }

  async deleteComment(slug, commentId) {
    const responseDeleteComment = await this.request.delete(
      `/api/articles/${slug}/comments/${commentId}`
    );
    return responseDeleteComment;
  }
}
