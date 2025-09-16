import {
  APIRequestContext,
  test as base,
  expect,
  request as apiRequest,
} from "@playwright/test";
import { UserData } from "../../data/UserData";
import { defaultHeaders } from "../../data/headers/headers";

type Fixtures = {
  updateUser: {
    email: string;
    username: string;
    password: string;
    bio: string;
    image: string;
  };
  request: APIRequestContext;
};

export const test = base.extend<Fixtures>({
  updateUser: async ({}, use) => {
    const userData = new UserData();
    const updateUser = userData.generateUpdateBody();
    await use(updateUser);
  },

  request: async ({ request }, use) => {
    const userData = new UserData();
    const logInData = userData.generateLogInBody();

    const response = await request.post("/api/users", {
      headers: defaultHeaders,
      data: {
        user: {
          username: logInData.username,
          email: logInData.email,
          password: logInData.password,
        },
      },
    });

    const body = await response.json();
    const token = body.user.token;

    expect(response.status()).toBe(200);

    const requestWithToken = apiRequest.newContext({
      extraHTTPHeaders: {
        Authorization: `Token ${token}`,
      },
    });
    await use(await requestWithToken);
  },
});
