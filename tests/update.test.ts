import { test, expect } from '@playwright/test';
import { ConfigurableUserActor } from '@src/actors/ConfigurableUserActor';
require('dotenv').config({ path: 'config/.pre.env' });


test.describe('GitHub Update User Profile API Test', () => {
  const endpoint = `/user`;
  const token = process.env.TOKEN;
  const jsonResponsePath = 'data/responses/userProfileUpdate.json';


  const updatedUserData = {
    name: "LordOfTheBug",
    bio: "This is a test bio for workflow",
    blog: "https://testExample.com"
  }

  test('Authenticated update and validate user profile fields', async () => {
    const username = process.env.USERNAME!
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePath, token, updatedUserData).createActor();

    const patchResponse = await actor.tasksAccess.patchDataToApi.performAs(actor);
    expect(await patchResponse.status()).toBe(200);

    
    const profileResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateDataResponse.answeredBy(profileResponse);
  });

  test('Unauthorized update attempt should fail', async () => {
  
    const unauthorizedUser = 'octocat';
    const actor = await new ConfigurableUserActor("unauthorizedUser", endpoint, jsonResponsePath).createActor();

    const patchResponse = await actor.tasksAccess.patchDataToApi.performAs(actor);

    expect(patchResponse.status()).toBe(401);
  });
});
