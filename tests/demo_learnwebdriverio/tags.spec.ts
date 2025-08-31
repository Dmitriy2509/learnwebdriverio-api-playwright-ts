import {test, expect } from "@playwright/test";

test("DL-0001 Get tags", async({request})=>{
    const response = await request.get('api/tags/');
    console.log(response.url());
    console.log(await response.json());

    expect(response.status()).toBe(200);
});