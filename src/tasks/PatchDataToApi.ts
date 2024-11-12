import { Actor } from '../actors/Actor';

export class PatchDataToApi {
  private endpoint: string;
  private data: Record<string, any>;

  constructor(endpoint: string, data: Record<string, any>) {
    this.endpoint = endpoint;
    this.data = data;
  }

  public async performAs(actor: Actor): Promise<any> {
    const response = await actor.abilitiesAccess.makeApiRequests.patch(this.endpoint, this.data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
}
