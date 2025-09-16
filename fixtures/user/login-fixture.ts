import { test as base, expect } from "@playwright/test";
import { UserData } from "../../data/UserData";
import { defaultHeaders } from "../../data/headers/headers";

type Fixtures = {
  signInUser: {
    username: string;
    email: string;
    password: string;
  };
  loginUser: {
    email: string;
    password: string;
  };
};

export const test = base.extend<Fixtures>({
  signInUser: async ({}, use) => {
    const userData = new UserData();
    const signInData = userData.generateLogInBody();
    await use(signInData);
  },

  loginUser: async ({ request }, use) => {
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

    expect(response.status()).toBe(200);
    await use(logInData);
  },
});
