import { APIRequestContext } from "@playwright/test";

export class FavoriteArticle {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addArticleToFavorite(slug) {
    const responseAddArticleToFavorite = await this.request.post(
      `/api/articles/${slug}/favorite`
    );
    return responseAddArticleToFavorite;
  }

  async deleteArticleFromFavorite(slug) {
    const responseDeleteArticleFromFavorite = await this.request.delete(
      `/api/articles/${slug}/favorite`
    );
    return responseDeleteArticleFromFavorite;
  }
}
