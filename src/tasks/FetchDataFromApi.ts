import { Actor } from '../actors/Actor';

export class FetchDataFromApi {
  private endpoint: string;

  constructor( endpoint: string) {
    this.endpoint = endpoint;
  }

  public async performAs(actor: Actor): Promise<any> {
    const response = await actor.abilitiesAccess.makeApiRequests.get(this.endpoint)
    return response
  }
}
