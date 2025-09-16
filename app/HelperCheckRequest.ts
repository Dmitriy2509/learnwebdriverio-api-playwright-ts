import { expect } from "@playwright/test";

export class HelperCheckRequest {
  constructor() {}

  async verifyHeadersHasValue(response, headerName, headerValue) {
    const headers = response.headers();
    const header = headers[headerName.toLowerCase()];
    expect(header).toBe(headerValue);
  }

  verifySchema(schema, jsonObject) {
    const { error } = schema.validate(jsonObject);
    expect(error).toBeUndefined();
  }
}
