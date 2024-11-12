import { ActorTemplate } from './ActorTemplate';
import { ActorBuilder } from './ActorBuilder';
import { FetchDataFromApi } from '@tasks/FetchDataFromApi';
import { PatchDataToApi } from '@tasks/PatchDataToApi';
import { ValidateDataResponse } from '@questions/ValidateDataResponse';
import { ValidateNotFoundResponse } from '@questions/ValidateNotFoundResponse';

export class ConfigurableUserActor extends ActorTemplate {
  private jsonResponsePath?: string;
  private endpoint: string;
  private patchData?: Record<string, any>;

  constructor(username: string, endpoint: string, jsonResponsePath?: string, token?: string, patchData?: Record<string, any>) {
    super(username, token);
    this.endpoint = endpoint;
    this.jsonResponsePath = jsonResponsePath;
    this.patchData = patchData;
  }

  protected addSpecificTasks(builder: ActorBuilder): void {
    const patchDataToApi = new PatchDataToApi(this.endpoint, this.patchData || {});
    builder.addTask(patchDataToApi);
    
    const fetchDataFromApi = new FetchDataFromApi(this.endpoint);
    builder.addTask(fetchDataFromApi);
  }

  protected addSpecificQuestions(builder: ActorBuilder): void {
    if (this.jsonResponsePath) {
      const validateDataResponse = new ValidateDataResponse(this.jsonResponsePath);
      builder.addQuestion(validateDataResponse);
    } else {
      const validateNotFoundResponse = new ValidateNotFoundResponse();
      builder.addQuestion(validateNotFoundResponse);
    }
  }
}
