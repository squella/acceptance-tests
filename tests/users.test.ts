import { test} from '@playwright/test';
import { ConfigurableUserActor } from '@src/actors/ConfigurableUserActor';
require('dotenv').config({ path: 'config/.pre.env' });


test.describe('GitHub Public User Profile API Test', () => {
  const username = process.env.PUBLIC_USER!;
  const endpoint = `/users/${username}`
  const jsonResponsePath = 'data/responses/externalUserProfile.json';

  test('Fetch and validate public user profile without authentication', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePath).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateDataResponse.answeredBy(response);
  });
});

test.describe('GitHub Authenticated User Profile API Test', () => {
  const username = process.env.USERNAME!;
  const endpoint = '/user';
  const jsonResponsePath = 'data/responses/authenticatedUserProfile.json';
  const token = process.env.TOKEN!;

  test('Fetch and validate authenticated user profile', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePath, token).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateDataResponse.answeredBy(response);
  });
});

test.describe('GitHub Non-Existent User Profile API Test', () => {
  const username = 'pepenonexistentuser123456';
  const endpoint = `/users/${username}`;

  test('Fetch and validate 404 Not Found for non-existent user', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateNotFoundResponse.answeredBy(response);
  });
});