import { test, expect } from '@playwright/test';
import { ConfigurableUserActor } from '@src/actors/ConfigurableUserActor';
require('dotenv').config({ path: 'config/.pre.env' });

test.describe.serial('GitHub User Workflow API Test', () => {

  const endpoint = '/user';
  const reposEndpoint = '/user/repos';
  const nonExistentRepoEndpoint = '/repos/nonexistent-owner/nonexistent-repo/commits';

  const token = process.env.TOKEN!;
  const username = process.env.USERNAME!;

  const jsonResponsePathProfile = 'data/responses/userProfile.json';
  const jsonResponsePathUpdate = 'data/responses/userProfileUpdate.json';
  const jsonResponsePathRepo = 'data/responses/userRepos.json';

  const updatedUserData = {
    name: "LordOfTheBug",
    bio: "This is a test bio for workflow",
    blog: "https://testExample.com"
  };

  let reposData: any[] = [];

  test('Step 1: Attempt to get profile without authentication (should fail with 401)', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePathProfile).createActor();
    const profileResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(profileResponse.status()).toBe(401);
  });

  test('Step 2: Retry with authentication (should succeed with 200)', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePathProfile, token).createActor();
    const profileResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(profileResponse.status()).toBe(200);
  });

  test('Step 3: Update the authenticated user\'s profile', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePathUpdate, token, updatedUserData).createActor();
    const patchResponse = await actor.tasksAccess.patchDataToApi.performAs(actor);
    expect(patchResponse.status()).toBe(200);
  });

  test('Step 4: Get the profile again and validate the update', async () => {
    const actor = await new ConfigurableUserActor(username, endpoint, jsonResponsePathProfile, token).createActor();
    const profileResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(profileResponse.status()).toBe(200);
    const profileData = await profileResponse.json();
    expect(profileData.name).toBe(updatedUserData.name);
    expect(profileData.bio).toBe(updatedUserData.bio);
    expect(profileData.blog).toBe(updatedUserData.blog);
  });

  test('Step 5: Get the list of repositories for the authenticated user', async () => {
    const actor = await new ConfigurableUserActor(username, reposEndpoint, jsonResponsePathRepo, token).createActor();
    const reposResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(reposResponse.status()).toBe(200);
    reposData = await reposResponse.json();
    expect(Array.isArray(reposData)).toBe(true);
    expect(reposData.length).toBeGreaterThan(0);
  });

  test('Step 6: Attempt to list commits of a non-existent repository (should fail with 404)', async () => {
    const actor = await new ConfigurableUserActor(username, nonExistentRepoEndpoint, undefined, token).createActor();
    const nonExistentRepoCommitsResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(nonExistentRepoCommitsResponse.status()).toBe(404);
  });

  test('Step 7: List commits from the first repository and validate key fields', async () => {
    expect(reposData).toBeDefined();
    expect(reposData.length).toBeGreaterThan(0);

    const firstRepo = reposData[0];
    const firstRepoName = firstRepo.name;
    const firstRepoOwner = firstRepo.owner.login;
    const firstRepoCommitsEndpoint = `/repos/${firstRepoOwner}/${firstRepoName}/commits`;

    const actor = await new ConfigurableUserActor(username, firstRepoCommitsEndpoint, undefined, token).createActor();
    const commitsResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(commitsResponse.status()).toBe(200);
    const commitsData = await commitsResponse.json();
    expect(commitsData.length).toBeGreaterThan(0);

    const firstCommit = commitsData[0];
    expect(firstCommit).toHaveProperty('sha');
    expect(firstCommit.commit).toHaveProperty('author');
    expect(firstCommit.commit.author).toHaveProperty('date');
    expect(firstCommit.commit).toHaveProperty('message');
  });

  test('Step 8: List commits from the last repository and validate key fields', async () => {
    expect(reposData).toBeDefined();
    expect(reposData.length).toBeGreaterThan(0);

    const lastRepo = reposData[reposData.length - 1];
    const lastRepoName = lastRepo.name;
    const lastRepoOwner = lastRepo.owner.login;
    const lastRepoCommitsEndpoint = `/repos/${lastRepoOwner}/${lastRepoName}/commits`;

    const actor = await new ConfigurableUserActor(username, lastRepoCommitsEndpoint, undefined, token).createActor();
    const commitsResponse = await actor.tasksAccess.fetchDataFromApi.performAs(actor);
    expect(commitsResponse.status()).toBe(200);
    const commitsData = await commitsResponse.json();
    expect(commitsData.length).toBeGreaterThan(0);

    const firstCommit = commitsData[0];
    expect(firstCommit).toHaveProperty('sha');
    expect(firstCommit.commit).toHaveProperty('author');
    expect(firstCommit.commit.author).toHaveProperty('date');
    expect(firstCommit.commit).toHaveProperty('message');
  });
});
