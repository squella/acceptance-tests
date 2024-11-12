import { test} from '@playwright/test';
import { ReposUserActor } from '@src/actors/ReposUserActor';
require('dotenv').config({ path: 'config/.pre.env' });

test.describe('GitHub User Public Repos API Test', () => {
  const username = process.env.PUBLIC_USER!;
  const endpoint = `/users/${username}/repos`;
  const jsonKeyFieldsPath = 'data/responses/repoKeyFields.json';

  test('Fetch and validate key fields in public repos of a valid user', async () => {
    const actor = await new ReposUserActor(username, endpoint, jsonKeyFieldsPath).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateKeyFieldsResponse.answeredBy(response);
  });

  test('Fetch and validate 404 for repos of a non-existent user', async () => {
    const invalidUsername = 'nonexistentuser123456';
    const invalidEndpoint = `/users/${invalidUsername}/repos`;

    const actor = await new ReposUserActor(invalidUsername, invalidEndpoint, jsonKeyFieldsPath).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateNotFoundResponse.answeredBy(response);

  });


  test('Fetch and validate key fields in repos of the authenticated user', async () => {
    const username = process.env.USERNAME!;
    const endpoint = `/user/repos`;
    const jsonKeyFieldsPath = 'data/responses/authenticatedUserReposKeyFields.json';
    const token = process.env.TOKEN!;


    const actor = await new ReposUserActor(username, endpoint, jsonKeyFieldsPath, token).createActor();

    const response = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    await actor.questionsAccess.validateKeyFieldsResponse.answeredBy(response);
  });


});

