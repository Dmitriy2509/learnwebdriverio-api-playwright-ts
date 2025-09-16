import { APIRequestContext } from "@playwright/test";

export class Tag {
  request: APIRequestContext;

  constructor(request) {
    this.request = request;
  }

  async getTag(tag) {
    const response = await this.request.get(`/api/articles?tag=${tag}`);
    return response;
  }
}
