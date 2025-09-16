import { expect } from "@playwright/test";
import { test } from "../../fixtures/user/login-fixture";
import { test as updateTest } from "../../fixtures/user/update-fixture";
import { APIClient } from "../../app/clients/APIClient";
import {
  contentTypeHeader,
  contentTypeHeaderValue,
} from "../../data/headers/headers";
import { SchemaClient } from "../../app/clients/SchemaClient";

test(
  "TC-0001 Create a new user",
  { tag: ["@regression", "@smoke", "@user"] },
  async ({ request, signInUser }) => {
    const client = new APIClient(request);
    const clientSchema = new SchemaClient();

    const responseCreateNewUser = await client.user.createNewUser(request, signInUser);
    const createdUser = await responseCreateNewUser.json();

    expect(responseCreateNewUser.status()).toBe(200);
    await client.helperCheckRequest.verifyHeadersHasValue(
      responseCreateNewUser,
      contentTypeHeader,
      contentTypeHeaderValue
    );
    client.helperCheckRequest.verifySchema(
      clientSchema.userSchemas.userSchema,
      createdUser
    );
  }
);

test(
  "TC-0002 Log in user",
  { tag: ["@regression", "@smoke", "@user"] },
  async ({ request, loginUser }) => {
    const client = new APIClient(request);
    const clientSchema = new SchemaClient();

    const responseLogInUser = await client.user.logInUser(request, loginUser);
    const loggedInUser = await responseLogInUser.json();

    expect(responseLogInUser.status()).toBe(200);
    await client.helperCheckRequest.verifyHeadersHasValue(
      responseLogInUser,
      contentTypeHeader,
      contentTypeHeaderValue
    );
    client.helperCheckRequest.verifySchema(
      clientSchema.userSchemas.userSchema,
      loggedInUser
    );
  }
);

updateTest(
  "TC-0003 Update user",
  { tag: ["@regression", "@smoke", "@user"] },
  async ({ request, updateUser }) => {
    const client = new APIClient(request);
    const clientSchema = new SchemaClient();

    const responseUpdateUser = await client.user.updateUser(request, updateUser);
    const updatedUser = await responseUpdateUser.json();

    expect(responseUpdateUser.status()).toBe(200);
    await client.helperCheckRequest.verifyHeadersHasValue(
      responseUpdateUser,
      contentTypeHeader,
      contentTypeHeaderValue
    );
    client.helperCheckRequest.verifySchema(
      clientSchema.userSchemas.updatedUserSchema,
      updatedUser
    );
  }
);
