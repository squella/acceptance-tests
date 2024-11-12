import { ActorBuilder } from './ActorBuilder';
import { Actor } from './Actor';
import { request } from '@playwright/test';
import { MakeApiRequests } from '@abilities/MakeApiRequests';

export abstract class ActorTemplate {
  protected username: string;
  protected token?: string;

  constructor(username: string, token?: string) {
    this.username = username;
    this.token = token;
  }

  public async createActor(): Promise<Actor> {
    const requestContext = await this.configureRequestContext();
    const actorBuilder = new ActorBuilder(this.username, this.token);

    this.addCommonAbilities(actorBuilder, requestContext);
    this.addSpecificTasks(actorBuilder);
    this.addSpecificQuestions(actorBuilder);

    return actorBuilder.build();
  }

  protected async configureRequestContext() {
    const headers = {
      'Accept': 'application/vnd.github+json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
    };

    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL no está configurado en el entorno.");
    }
  
    return await request.newContext({
      baseURL: process.env.BASE_URL!,
      extraHTTPHeaders: headers,
    });
  }

  protected addCommonAbilities(builder: ActorBuilder, requestContext: any): void {
    const makeApiRequests = new MakeApiRequests(requestContext);
    builder.addAbility(makeApiRequests);
  }

  protected abstract addSpecificTasks(builder: ActorBuilder): void;
  protected abstract addSpecificQuestions(builder: ActorBuilder): void;
}
