import { test, expect } from '@playwright/test';
import { ReposUserActor } from '@src/actors/ReposUserActor';
require('dotenv').config({ path: 'config/.pre.env' });

test.describe('GitHub Repository Commits API Test', () => {
  const owner = process.env.PUBLIC_USER!;
  const repo = 'cypress-oscommerce';
  const endpoint = `/repos/${owner}/${repo}/commits`;
  const jsonKeyFieldsPath = 'data/responses/commitKeyFields.json';

  test('Fetch and validate key fields in commits of a public repository', async () => {
    const actor = await new ReposUserActor(owner, endpoint, jsonKeyFieldsPath).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(response.status()).toBe(200);
    await actor.questionsAccess.validateKeyFieldsResponse.answeredBy(response);
  });
});
